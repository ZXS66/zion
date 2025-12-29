import {
  registerLocaleData,
  CommonModule,
  DecimalPipe,
  DatePipe,
} from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppRoutingModule } from "src/app/app-routing.module";
import { AppComponent } from "src/app/app.component";
import {
  DocumentTitleService,
  BroadcastService,
} from "src/app/services/common.service";
import { SubMaterialModule } from "src/app/sub-material/sub-material.module";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { ForbiddenComponent } from "src/app/forbidden/forbidden.component";
import { UnknownComponent } from "src/app/unknown/unknown.component";
import { SitemapComponent } from "src/app/sitemap/sitemap.component";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
    UnknownComponent,
    SitemapComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SubMaterialModule,
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    DocumentTitleService,
    BroadcastService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
