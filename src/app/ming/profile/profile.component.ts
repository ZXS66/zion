import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { LOADING_STATUS, MESSAGE } from "src/app/constants";

import { FamilyMember, NameValueTag, normFamilyMember } from "src/app/ming/ming.models";
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
		RouterModule,
		SubMaterialModule,
	],
})
export class MingProfileComponent implements OnInit {
	pageTitle = "明朝皇室成员详情";

	memberId: number | null = null;

	member: Partial<FamilyMember> = {};
	/** extra informations that extracted from `this.member.extra` */
	extraInfo: any[][] = [];

	message = MESSAGE;
	loadingStatus: LOADING_STATUS = LOADING_STATUS.READY;

	commonExtraKeys = ['出生地', '别名', '在位时间', '封号', '年号', '庙号', '葬地', '谥号', '陵墓'];

	males: NameValueTag[] = [];
	females: NameValueTag[] = [];

	/** 是否处于操作模式(可编辑) */
	manipulationMode = false;

	constructor(private _route: ActivatedRoute, private _familyService: FamilyService, private _title: DocumentTitleService) { }

	ngOnInit(): void {
		this._title.setTitle(this.pageTitle);
		this.loadingStatus = LOADING_STATUS.LOADING;
		this.memberId = Number(this._route.snapshot.paramMap.get('id'));
		if (this.memberId) {
			this._familyService.getFamilyMember(this.memberId)
				.then((data) => {
					this.member = normFamilyMember(data);
					if (this.member.spread) {
						this.extraInfo = Object.entries(this.member.spread!);
					}
					// this.loadingStatus = LOADING_STATUS.LOADED;
					this.loadingStatus = LOADING_STATUS.READY;
				})
				.catch(() => {
					this.loadingStatus = LOADING_STATUS.ERROR;
				});
		} else {
			// unknown member id
			this.loadingStatus = LOADING_STATUS.ERROR;
		}
		const daddy = this._route.snapshot.queryParamMap.get("whosyourdaddy");
		this.manipulationMode = (isNotEmptyString(daddy) && daddy.trim().toLowerCase() === "johnzhu");
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

	addExtra() {
		this.extraInfo.push(["", ""]);
		return false;
	}
	removeExtra(index: number) {
		this.extraInfo.splice(index, 1);
	}

	updateMember() {
		if (!this.memberId) return;
		// prepare the form data
		const extra: Record<string, any> = {};
		for (const [key, value] of this.extraInfo) {
			if (isNotEmptyString(key) && isNotEmptyString(value)) {
				extra[key.trim()] = value.trim();
			}
		}
		this.member.extra = JSON.stringify(extra);
		this.loadingStatus = LOADING_STATUS.LOADING;
		this._familyService.updateFamilyMember(this.memberId, this.member)
			.then(() => {
				this.loadingStatus = LOADING_STATUS.LOADED;
			})
			.catch(() => {
				this.loadingStatus = LOADING_STATUS.ERROR;
			});
	}
}
