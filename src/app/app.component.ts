import { Component } from '@angular/core';
import { faMap } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  icons = {
    map: faMap
  }
}
