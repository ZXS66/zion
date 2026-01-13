import { Component } from "@angular/core";

import { ASSETS_BASE_URL } from "src/app/constants";
import { environment } from "src/environments/environment";
import { FamilyMember } from "src/app/ming/ming.models";
import { isNotEmptyArray } from "src/app/utils";

@Component({
  selector: "ming-hierarchy",
  imports: [],
  templateUrl: "./hierarchy.component.html",
	styleUrls: ["../common.component.css"],
})
export class MingHierarchyComponent {
  // https://github.com/gramps-project/gramps/blob/maintenance/gramps60/INSTALL

  loadingStatus: number = 0; // 0: loading, 1: loaded, 2: error

  data: FamilyMember[] = [];

  ngOnInit(): void {
    const fileLink = environment.production
      ? ASSETS_BASE_URL + `img/ming/ming_royal_family_complete.json`
      : "assets/ming_royal_family_complete.json";
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

  private _normalizeData(data: FamilyMember[]): FamilyMember[] {
    if (!isNotEmptyArray(data)) return [];
    const id_name = data.reduce(
      (acc, item) => {
        acc[item.id] = item.name;
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
