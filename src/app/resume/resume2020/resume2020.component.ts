import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { faPhone, faCogs, faCode, faUserCog, faGraduationCap, faHeart, faBriefcase, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWeibo, faWeixin, faQq, faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-resume2020',
    templateUrl: './resume2020.component.html',
    styleUrls: ['./resume2020.component.css'],
    standalone: false
})
export class Resume2020Component implements OnInit {

  /** fontawesome icons */
  icons: { [prop: string]: IconDefinition } = {
    faWeibo,
    faWeixin,
    faQq,
    faEnvelope,
    faPhone,
    faCogs,
    faUserCog,
    faUserAlt,
    faGraduationCap,
    faHeart,
    faCss3,
    faHtml5,
    faJs,
    faBriefcase,
    faCode
  };

  constructor() { }

  ngOnInit(): void {
    document.title = `个人简历_朱浔生_2020`;
  }
  showWeChatQRCode(): void {
    // TODO
  }

}
