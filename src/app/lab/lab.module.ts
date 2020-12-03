import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebworkerComponent } from './webworker/webworker.component';
import { Routes, RouterModule } from '@angular/router';
import { SitemapComponent } from './sitemap/sitemap.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { HttpClientModule } from '@angular/common/http';

const labRoutes: Routes = [
  { path: 'webworker', component: WebworkerComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: 'unsubscribe', component: UnsubscribeComponent },
  { path: '', redirectTo: 'unsubscribe', pathMatch: 'full' }
];

@NgModule({
  declarations: [WebworkerComponent, SitemapComponent, UnsubscribeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(labRoutes),
    HttpClientModule
  ]
})
export class LabModule { }
