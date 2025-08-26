import {
  registerLocaleData,
  CommonModule,
  DecimalPipe,
  DatePipe,
} from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  DocumentTitleService,
  BroadcastService,
} from "./services/common.service";

import { SubMaterialModule } from "./sub-material/sub-material.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { UnknownComponent } from "./unknown/unknown.component";
import { SitemapComponent } from "./sitemap/sitemap.component";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
    UnknownComponent,
    SitemapComponent,
  ],
  imports: [
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
