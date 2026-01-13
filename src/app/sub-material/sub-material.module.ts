import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatNativeDateModule, provideNativeDateAdapter } from "@angular/material/core";

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from '@angular/material/select';
// import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";

const subModules = [
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatFormFieldModule,
	// MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatNativeDateModule,
	MatSelectModule,
	// MatSlideToggleModule,
	MatTableModule,
	MatTabsModule,
];

@NgModule({
	declarations: [],
	imports: [CommonModule, ...subModules],
	exports: subModules,
	// providers: [provideNativeDateAdapter()]
})
export class SubMaterialModule { }
