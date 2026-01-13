import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { SubMaterialModule } from "src/app/sub-material/sub-material.module";
import { FamilyMember, normFamilyMember } from "src/app/ming/ming.models";
import { FamilyService } from "../services/family.service";
import { DocumentTitleService } from "src/app/services/common.service";
import { isNotEmptyArray, isNotEmptyString } from "src/app/utils";

@Component({
  selector: "ming-list",
  templateUrl: "./list.component.html",
  styleUrl: "../common.component.css",
  imports: [
    CommonModule,
    FormsModule,
    SubMaterialModule,
    // RouterOutlet,
    RouterLink,
    // RouterLinkActive
  ],
})
export class MingListComponent implements OnInit {
  pageTitle = "明朝皇室清单";

  loadingStatus: number = 0; // 0: loading, 1: loaded, 2: error

  displayedColumns: string[] = [
    "actions",
    "人物",
    // "status",
    // "父母",
    "年号封号谥号",
    // "在位时间",
    // "生卒",
    "简介",
    // "子嗣数量",
  ];

  data: FamilyMember[] = [];
  public constructor(private _http: FamilyService, private _title: DocumentTitleService) { }

  ngOnInit(): void {
    this._title.setTitle(this.pageTitle);
    this._http.searchFamilyMembers("")
      .then((data) => {
        this.data = isNotEmptyArray(data) ? data.map(normFamilyMember) : [];
        this.loadingStatus = 1;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.loadingStatus = 2;
      });
  }

}
