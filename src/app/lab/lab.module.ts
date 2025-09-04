import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

import { SubMaterialModule } from "../sub-material/sub-material.module";
import { UnsubscribeComponent } from "./unsubscribe/unsubscribe.component";
import { EmojiComponent } from "./emoji/emoji.component";
import { WeatherComponent } from "./weather/weather.component";
import { SocketService } from "../services/common.service";

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
