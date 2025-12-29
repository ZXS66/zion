import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

import { SubMaterialModule } from "src/app/sub-material/sub-material.module";
import { ListComponent } from "src/app/ming/list/list.component";
import { HierarchyComponent } from "src/app/ming/hierarchy/hierarchy.component";

const mingRoutes: Routes = [
  { path: "list", component: ListComponent },
  { path: "hierarchy", component: HierarchyComponent },
  { path: "", redirectTo: "list", pathMatch: "full" },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(mingRoutes),
    SubMaterialModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class MingModule {}
