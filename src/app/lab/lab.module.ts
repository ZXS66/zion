import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SitemapComponent } from './sitemap/sitemap.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { EmojiComponent } from './emoji/emoji.component';
import { SubMaterialModule } from '../sub-material/sub-material.module';

const labRoutes: Routes = [
  { path: 'emoji', component: EmojiComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: 'unsubscribe', component: UnsubscribeComponent },
  { path: '', redirectTo: 'unsubscribe', pathMatch: 'full' }
];

@NgModule({
  declarations: [SitemapComponent, UnsubscribeComponent, EmojiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(labRoutes),
    HttpClientModule,
    SubMaterialModule
  ]
})
export class LabModule { }
