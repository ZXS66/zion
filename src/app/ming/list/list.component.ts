import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { SubMaterialModule } from "src/app/sub-material/sub-material.module";
import { FamilyMember, normFamilyMember } from "src/app/ming/ming.models";
import { FamilyService } from "../services/family.service";
import { DocumentTitleService } from "src/app/services/common.service";
import { isNotEmptyArray, isNotEmptyString } from "src/app/utils";
import { LOADING_STATUS, MESSAGE } from "src/app/constants";

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

	loadingStatus: LOADING_STATUS = LOADING_STATUS.READY;

	displayedColumns: string[] = [
		"人物",
		"生卒",
		// "status",
		// "父母",
		"年号封号谥号",
		// "在位时间",
		"简介",
		// "子嗣数量",
	];

	data: FamilyMember[] = [];
	/** 提示信息 */
	message = MESSAGE;

	searchTerm: string = "";

	/** 是否处于操作模式(可编辑) */
	manipulationMode = false;

	public constructor(private _route: ActivatedRoute, private _http: FamilyService, private _title: DocumentTitleService) { }

	ngOnInit(): void {
		this._title.setTitle(this.pageTitle);
		const daddy = this._route.snapshot.queryParamMap.get("whosyourdaddy");
		this.manipulationMode = (isNotEmptyString(daddy) && daddy.trim().toLowerCase() === "johnzhu");
		this.doSearch();
	}

	doSearch() {
		this.loadingStatus = LOADING_STATUS.LOADING;
		this._http.searchFamilyMembers(this.searchTerm)
			.then((data) => {
				this.data = isNotEmptyArray(data) ? data.map(normFamilyMember) : [];
				this.loadingStatus = LOADING_STATUS.LOADED;
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				this.loadingStatus = LOADING_STATUS.ERROR;
			});
	}

}
