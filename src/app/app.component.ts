import { Component, OnInit } from "@angular/core";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { APP_NAME, APP_VERSION } from "./constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: false,
})
export class AppComponent implements OnInit {
  icons = { map: faMap };
  appName = APP_NAME;
  appVer = APP_VERSION;

  ngOnInit(): void {
    console.log(`application version: ${this.appVer}`);
  }
}
