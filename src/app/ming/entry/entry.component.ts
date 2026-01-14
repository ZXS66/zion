import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MESSAGE } from "src/app/constants";

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
export class MingEntryComponent implements OnInit {
	pageTitle = "添加明朝皇室成员";

	loadingStatus: number = 0; // 0: loading, 1: loaded, 2: error

	member: Partial<FamilyMember> = {};

	message = MESSAGE;

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

	addMember() {
		this.loadingStatus = 0;
		this._familyService.addFamilyMember(this.member)
			.then(() => {
				this.loadingStatus = 1;
			})
			.catch(() => {
				this.loadingStatus = 2;
			});
	}
}
