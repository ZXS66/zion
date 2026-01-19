import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import {
	provideHttpClient,
	withInterceptorsFromDi,
} from "@angular/common/http";

import { FamilyService } from "./services/family.service";

import { SubMaterialModule } from "src/app/sub-material/sub-material.module";
import { MingListComponent } from "src/app/ming/list/list.component";
import { MingHierarchyComponent } from "src/app/ming/hierarchy/hierarchy.component";
import { MingEntryComponent } from "src/app/ming/entry/entry.component";
import { MingProfileComponent } from "src/app/ming/profile/profile.component";
import { MingTreeComponent } from "./tree/tree.component";

const mingRoutes: Routes = [
	{ path: "entry", component: MingEntryComponent },
	{ path: "hierarchy", component: MingHierarchyComponent },
	{ path: "list", component: MingListComponent },
	{ path: "profile/:id", component: MingProfileComponent },
	{ path: "tree", component: MingTreeComponent },
	{ path: "", redirectTo: "list", pathMatch: "full" },
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(mingRoutes),
		SubMaterialModule,
		MingEntryComponent,
		MingHierarchyComponent,
		MingListComponent,
		MingProfileComponent,
		MingTreeComponent,
	],
	providers: [
		provideHttpClient(withInterceptorsFromDi()),
		FamilyService
	],
})
export class MingModule { }
