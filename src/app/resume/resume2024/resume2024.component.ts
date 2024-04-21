import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faCogs, faCode, faUserCog, faGraduationCap, faHeart, faBriefcase, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWeibo, faWeixin, faQq, faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-resume2024',
  templateUrl: './resume2024.component.html',
  styleUrls: ['./resume2024.component.css']
})
export class Resume2024Component implements OnInit {

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

@Component({
  selector: 'dialog-wechat-qrcode',
  templateUrl: 'dialog-wechat-qrcode.html',
  styles: [`
img{max-height:61.8vh;max-width:400px;}
  `]
})
export class DialogMyWechatQrcode {
  constructor(
    public dialogRef: MatDialogRef<DialogMyWechatQrcode>
  ) { }
  close(): void {
    this.dialogRef.close();
  }
}