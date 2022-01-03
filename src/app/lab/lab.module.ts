import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { EmojiComponent } from './emoji/emoji.component';
import { SubMaterialModule } from '../sub-material/sub-material.module';
import { SearchMasterComponent } from './search-master/search-master.component';

const labRoutes: Routes = [
  { path: 'emoji', component: EmojiComponent },
  { path: 'unsubscribe', component: UnsubscribeComponent },
  { path: 'search', component: SearchMasterComponent },
  { path: '', redirectTo: 'unsubscribe', pathMatch: 'full' }
];

@NgModule({
  declarations: [UnsubscribeComponent, EmojiComponent, SearchMasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(labRoutes),
    HttpClientModule,
    SubMaterialModule
  ]
})
export class LabModule { }
