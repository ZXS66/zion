import { Component } from "@angular/core";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { SYSTEM_NAME } from "./constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: false,
})
export class AppComponent {
  icons = {
    map: faMap,
  };
  nowYear = new Date().getFullYear();
  appName = SYSTEM_NAME;
}
