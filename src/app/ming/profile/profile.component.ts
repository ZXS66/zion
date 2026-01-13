import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";

import { FamilyMember, normFamilyMember } from "src/app/ming/ming.models";
import { FamilyService } from "src/app/ming/services/family.service";
import { DocumentTitleService } from "src/app/services/common.service";
import { SubMaterialModule } from "src/app/sub-material/sub-material.module";
import { isNotEmptyArray, isNotEmptyString } from "src/app/utils";

@Component({
  selector: "ming-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["../common.component.css"],
  imports: [
    CommonModule,
    FormsModule,
    SubMaterialModule,
    RouterModule
  ],
})
export class MingProfileComponent implements OnInit {
  pageTitle = "明朝皇室成员详情";

  memberId: number | null = null;
  member: Partial<FamilyMember> = {};
  /** extra informations that extracted from `this.member.extra` */
  extraInfo: any[][] = [];

  loading = false;
  error: string | null = null;
  success: boolean = false;

  commonExtraKeys = ['出生地', '别名', '在位时间', '封号', '年号', '庙号', '葬地', '谥号', '陵墓'];

  constructor(private route: ActivatedRoute, private familyService: FamilyService, private _title: DocumentTitleService) { }

  ngOnInit(): void {
    this._title.setTitle(this.pageTitle);
    this.loading = true;
    this.memberId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.memberId) {
      this.familyService.getFamilyMember(this.memberId)
        .then((data) => {
          this.member = normFamilyMember(data);
          if (this.member.spread) {
            this.extraInfo = Object.entries(this.member.spread!);
          }
          this.loading = false;
        })
        .catch(() => {
          this.error = "加载失败";
          this.loading = false;
        });
    } else {
      this.error = "无效ID";
      this.loading = false;
    }
  }


  addExtra() {
    this.extraInfo.push(["", ""]);
    return false;
  }
  removeExtra(index: number) {
    this.extraInfo.splice(index, 1);
  }

  updateMember() {
    if (!this.memberId) return;
    this.loading = true;
    this.error = null;
    // prepare the form data
    const extra: Record<string, any> = {};
    for (const [key, value] of this.extraInfo) {
      if (isNotEmptyString(key) && isNotEmptyString(value)) {
        extra[key.trim()] = value.trim();
      }
    }
    this.member.extra = JSON.stringify(extra);
    this.familyService.updateFamilyMember(this.memberId, this.member)
      .then(() => {
        this.success = true;
        this.loading = false;
      })
      .catch(() => {
        this.error = "更新失败";
        this.loading = false;
      });
  }
}
