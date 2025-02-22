import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dialog-wechat-qrcode',
    templateUrl: 'dialog-wechat-qrcode.html',
    styles: [`img{max-height:61.8vh;max-width:400px;}`],
    standalone: false
})
export class DialogMyWechatQrcode {
    constructor(
        public dialogRef: MatDialogRef<DialogMyWechatQrcode>
    ) { }
    close(): void {
        this.dialogRef.close();
    }
}