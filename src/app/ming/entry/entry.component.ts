import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LOADING_STATUS, MESSAGE } from "src/app/constants";

import { FamilyMember, NameValueTag } from "src/app/ming/ming.models";
import { FamilyService } from "src/app/ming/services/family.service";
import { DocumentTitleService } from "src/app/services/common.service";
import { SubMaterialModule } from "src/app/sub-material/sub-material.module";
import { isNotEmptyArray } from "src/app/utils";

@Component({
	selector: "ming-entry",
	templateUrl: "./entry.component.html",
	styleUrls: ["../common.component.css"],
	imports: [
		CommonModule,
		FormsModule,
		SubMaterialModule,
		RouterLink,
	],
})
export class MingEntryComponent implements OnInit, OnDestroy {
	pageTitle = "添加明朝皇室成员";

	member: Partial<FamilyMember> = {};

	message = MESSAGE;
	loadingStatus: LOADING_STATUS = LOADING_STATUS.READY;

	males: NameValueTag[] = [];
	females: NameValueTag[] = [];

	constructor(private _familyService: FamilyService, private _title: DocumentTitleService) { }

	ngOnInit(): void {
		this._title.setTitle(this.pageTitle);
		this.loadNameMeta();
	}
	loadNameMeta() {
		this._familyService.queryNameMeta()
			.then((data) => {
				if (isNotEmptyArray(data)) {
					this.males = data.filter(item => item.tag === 1);
					this.females = data.filter(item => item.tag === 2);
				}
			});
	}
	_backTimer: any = null;

	addMember() {
		this.loadingStatus = LOADING_STATUS.LOADING;
		this._familyService.addFamilyMember(this.member)
			.then(() => {
				this.loadingStatus = LOADING_STATUS.LOADED;
				this._backTimer = setTimeout(() => {
					window.history.back();
				}, 2048);
			})
			.catch(() => {
				this.loadingStatus = LOADING_STATUS.ERROR;
			});
	}
	ngOnDestroy(): void {
		if (this._backTimer) {
			clearTimeout(this._backTimer);
		}
	}
}
