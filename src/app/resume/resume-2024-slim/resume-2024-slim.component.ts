import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faCogs, faCode, faUserCog, faGraduationCap, faHeart, faBriefcase, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWeibo, faWeixin, faQq, faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';
import { DialogMyWechatQrcode } from '../dialog-wechat-qrcode/dialog-wechat-qrcode';

import { MatDialog } from '@angular/material/dialog';
import { ASSETS_BASE_URL } from 'src/app/constants';

@Component({
    selector: 'app-resume-2024-slim',
    templateUrl: './resume-2024-slim.component.html',
    styleUrls: ['./resume-2024-slim.component.css'],
    standalone: false
})
export class Resume2024SlimComponent implements OnInit {

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

  /** base url of images */
  img_base = ASSETS_BASE_URL + 'img/';
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    document.title = `个人简历_朱浔生_2024`;
  }
  showWeChatQRCode() {
    this.dialog.open(DialogMyWechatQrcode);
  }
}
