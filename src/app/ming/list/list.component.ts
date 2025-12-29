import { Component, OnInit } from "@angular/core";
import {
  MatTableModule,
  MatTableDataSource,
  MatHeaderRowDef,
  MatRowDef,
} from "@angular/material/table";

import { ASSETS_BASE_URL } from "src/app/constants";

import { RoyalFamilyMember } from "src/app/ming/ming.models";
import { isNotEmptyArray } from "src/app/utils";

@Component({
  selector: "ming-list",
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css",
  // standalone: false,
  imports: [MatTableModule],
})
export class ListComponent implements OnInit {
  loadingStatus: number = 0; // 0: loading, 1: loaded, 2: error

  displayedColumns: string[] = [
    "人物",
    // "status",
    "父母",
    "年号庙号封号",
    "在位时间",
    // "生卒",
    "主要政绩或备注",
    // "子嗣数量",
  ];

  data: RoyalFamilyMember[] = [];

  ngOnInit(): void {
    // const fileLink =
    //   ASSETS_BASE_URL + `img/ming/ming_royal_family_complete.json`;
    const fileLink = "assets/ming_royal_family_complete.json";
    fetch(fileLink)
      .then((response) => response.json())
      .then((data) => {
        this.data = this._normalizeData(data);
        // console.table(this.data);
        this.loadingStatus = 1;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.loadingStatus = 2;
      });
  }

  private _normalizeData(data: RoyalFamilyMember[]): RoyalFamilyMember[] {
    if (!isNotEmptyArray(data)) return [];
    const id_name = data.reduce(
      (acc, item) => {
        acc[item.id] = item.姓名;
        return acc;
      },
      {} as Record<string, string>,
    );
    return data.map((item) => ({
      ...item,
      父亲: id_name[item.father_id] || "未知",
    }));
  }
}
