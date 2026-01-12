import { Component, OnInit } from "@angular/core";
import {
  MatTableModule,
  MatTableDataSource,
  MatHeaderRowDef,
  MatRowDef,
} from "@angular/material/table";

import { API_BASE_URL, API_TOKEN, ASSETS_BASE_URL } from "src/app/constants";
import { environment } from "src/environments/environment";
import { FamilyMember } from "src/app/ming/ming.models";
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

  data: FamilyMember[] = [];

  ngOnInit(): void {
    const params = new URLSearchParams();
    params.set("q", "");
    const fileLink = `${API_BASE_URL}family/members/?${params}`;
    fetch(fileLink, {
      method: "GET",
      headers: { "x-token": API_TOKEN, "Content-Type": "application/json" },
    })
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

  private _normalizeData(data: FamilyMember[]): FamilyMember[] {
    if (!isNotEmptyArray(data)) return [];
    const id_name = data.reduce(
      (acc, item) => {
        acc[item.id] = item.name;
        return acc;
      },
      {} as Record<string, string>,
    );
    return data.map((item) => {
      return {
        ...item,
        父亲: id_name[item.father_id] || "未知",
      };
    });
  }
}
