import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { AboutMeComponent } from './about-me/about-me.component';
import { Resume2020Component } from './resume2020/resume2020.component';
import { SubMaterialModule } from '../sub-material/sub-material.module';
import { Resume2024SlimComponent } from './resume-2024-slim/resume-2024-slim.component';
import { Resume2024Component } from './resume-2024/resume-2024.component';
import { Resume2024ComplianceComponent } from './resume-2024-compliance/resume-2024-compliance.component';

const resumeRoutes: Routes = [
  { path: '2024-slim', component: Resume2024SlimComponent },
  { path: '2024', component: Resume2024Component },
  { path: '2024-compliance', component: Resume2024ComplianceComponent },
  { path: '2020', component: Resume2020Component },
  { path: 'aboutme', component: AboutMeComponent },
  { path: '', redirectTo: 'aboutme', pathMatch: 'full' }
];

@NgModule({
  declarations: [AboutMeComponent, Resume2020Component, AboutMeComponent, Resume2024SlimComponent, Resume2024Component, Resume2024ComplianceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(resumeRoutes),
    SubMaterialModule,
    FontAwesomeModule
  ]
})
export class ResumeModule { }
