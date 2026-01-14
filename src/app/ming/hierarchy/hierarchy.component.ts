import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MESSAGE } from "src/app/constants";
import { NameValueChildren } from "src/app/ming/ming.models";
import { DocumentTitleService } from "src/app/services/common.service";
import { FamilyService } from "../services/family.service";
import { SubMaterialModule } from "src/app/sub-material/sub-material.module";

@Component({
  selector: "ming-hierarchy",
  templateUrl: "./hierarchy.component.html",
  styleUrls: ["../common.component.css"],
  imports: [CommonModule, SubMaterialModule, RouterModule],
})
export class MingHierarchyComponent {
  pageTitle = "明朝皇室成员图";

  hierarchy: NameValueChildren = null;

  message = MESSAGE;
  constructor(
    private _title: DocumentTitleService,
    private _familySvc: FamilyService,
  ) { }
  ngOnInit(): void {
    this._title.setTitle(this.pageTitle);
    this._familySvc
      .queryHierarchy()
      .then((data) => {
        this.hierarchy = data;
      })
      .catch((e) => console.error(e));
  }
}
