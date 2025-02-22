import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCopy, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWeibo, faWeixin, faQq, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.css'],
    standalone: false
})
export class AboutMeComponent implements OnInit {

  icons: { [prop: string]: IconDefinition } = {
    faWeibo,
    faWeixin,
    faQq,
    faEnvelope,
    faGithub
  };
  constructor() {
  }

  ngOnInit(): void {
    // console.log(AboutMeComponent.name + 'is initialized.');
  }

}
