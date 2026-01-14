import { Component, OnInit } from "@angular/core";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { APP_NAME, APP_BUILTTIME } from "src/app/constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: false,
})
export class AppComponent implements OnInit {
  icons = { map: faMap };
  appName = APP_NAME;
  appBuiltTime = APP_BUILTTIME;

  ngOnInit(): void {
    console.log(`application built time: ${this.appBuiltTime}`);
  }
}
