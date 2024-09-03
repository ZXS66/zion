import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faCogs, faCode, faUserCog, faGraduationCap, faHeart, faBriefcase, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWeibo, faWeixin, faQq, faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';
import { MatDialog } from '@angular/material/dialog';

import { DialogMyWechatQrcode } from '../dialog-wechat-qrcode/dialog-wechat-qrcode';

@Component({
  selector: 'app-resume-2024-compliance',
  templateUrl: './resume-2024-compliance.component.html',
  styleUrls: ['./resume-2024-compliance.component.css']
})
export class Resume2024ComplianceComponent implements OnInit {

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    document.title = `个人简历_朱浔生_2024`;
  }
  showWeChatQRCode() {
    this.dialog.open(DialogMyWechatQrcode);
  }

}
