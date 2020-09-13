import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebworkerComponent } from './webworker/webworker.component';
import { Routes, RouterModule } from '@angular/router';
import { SitemapComponent } from './sitemap/sitemap.component';

const labRoutes: Routes = [
  { path: 'webworker', component: WebworkerComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: '', redirectTo: 'sitemap', pathMatch: 'full' }
];

@NgModule({
  declarations: [WebworkerComponent, SitemapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(labRoutes)
  ]
})
export class LabModule { }
