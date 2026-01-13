import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { FamilyMember } from "src/app/ming/ming.models";
import { FamilyService } from "src/app/ming/services/family.service";
import { DocumentTitleService } from "src/app/services/common.service";
import { SubMaterialModule } from "src/app/sub-material/sub-material.module";

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
	member: Partial<FamilyMember> = {};
	loading = false;
	error: string | null = null;
	success: boolean = false;

	constructor(private familyService: FamilyService, private _title: DocumentTitleService) { }

	ngOnInit(): void {
		// Initialization logic if needed
		this._title.setTitle(this.pageTitle);
	}

	addMember() {
		this.loading = true;
		this.error = null;
		this.familyService.addFamilyMember(this.member)
			.then(() => {
				this.success = true;
				this.loading = false;
			})
			.catch(() => {
				this.error = "添加失败";
				this.loading = false;
			});
	}
}
