import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { AboutMeComponent } from './about-me/about-me.component';
import { Resume2020Component } from './resume2020/resume2020.component';
import { SubMaterialModule } from '../sub-material/sub-material.module';

const resumeRoutes: Routes = [
  { path: '2020', component: Resume2020Component },
  { path: 'aboutme', component: AboutMeComponent },
  { path: '', redirectTo: 'aboutme', pathMatch: 'full' }
];

@NgModule({
  declarations: [AboutMeComponent, Resume2020Component, AboutMeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(resumeRoutes),
    SubMaterialModule,
    FontAwesomeModule
  ]
})
export class ResumeModule { }
