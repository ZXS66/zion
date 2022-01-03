import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SubMaterialModule } from './sub-material/sub-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnknownComponent } from './unknown/unknown.component';
import { SitemapComponent } from './sitemap/sitemap.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
    UnknownComponent,
    SitemapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SubMaterialModule,
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
