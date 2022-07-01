import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-accept-dailog',
  templateUrl: './accept-dailog.component.html',
  styleUrls: ['./accept-dailog.component.scss']
})
export class AcceptDailogComponent implements OnInit {
  message: string = `Are you sure you want to Accept this?`;
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  DeleteData;
  isReasonRequired: boolean = false;
  errMsg: boolean = false;
  reasonOfCancel: string = '';
  dailogIsUsedFor: string;
  amountTrue: any = undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AcceptDailogComponent>
  ) {
    if (data) {
      console.log(data.status);
      this.amountTrue = data.amount
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }

      if (data.module = 'productManage') {
        this.dailogIsUsedFor = data.module;
        this.message = data.status == 2 ? `Are you sure you want to Accept this?` : `Are you sure you want to Reject this?`
        if (data.status == 3) {
          this.isReasonRequired = true;
        }
      }
    }
  }

  ngOnInit() {
  }
  onConfirmClick(): void {
    if (this.dailogIsUsedFor == "productManage") {
      if (this.isReasonRequired == true) {
        this.DeleteData = {
          delete: true,
          cancelReason: this.reasonOfCancel
        };
        if (this.reasonOfCancel != '')
          this.dialogRef.close(this.DeleteData);
        else
          this.errMsg = true
      }else {
        this.DeleteData = {
          delete: true
        };
        this.dialogRef.close(this.DeleteData);
    } 
    }
  }
}
