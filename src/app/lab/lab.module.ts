import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

import { SubMaterialModule } from "src/app/sub-material/sub-material.module";
import { UnsubscribeComponent } from "src/app/lab/unsubscribe/unsubscribe.component";
import { EmojiComponent } from "src/app/lab/emoji/emoji.component";
import { WeatherComponent } from "src/app/lab/weather/weather.component";
import { SocketService } from "src/app/services/common.service";

const labRoutes: Routes = [
  { path: "emoji", component: EmojiComponent },
  { path: "unsubscribe", component: UnsubscribeComponent },
  { path: "weather", component: WeatherComponent },
  { path: "", redirectTo: "emoji", pathMatch: "full" },
];

@NgModule({
  declarations: [UnsubscribeComponent, EmojiComponent, WeatherComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(labRoutes),
    SubMaterialModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), SocketService],
})
export class LabModule {}
