import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-dailog',
  templateUrl: './delete-dailog.component.html',
  styleUrls: ['./delete-dailog.component.scss']
})
export class DeleteDailogComponent implements OnInit {
  reasonOfCancel:string = '';
  message: string = `Are you sure you want to Delete this?`;
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  DeleteData;
  dailogIsUsedFor: any;
  errMsg: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteDailogComponent>) {
    if (data) {
      console.log(data.moduleName);
      this.dailogIsUsedFor = data.moduleName
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
      if(this.dailogIsUsedFor =="redeemRequest"){
          this.message  = `Are you sure you want to Decline this?`;
      }
      else if(this.dailogIsUsedFor =="generateQR"){
        this.message  = `Are you sure you want to Generate QR ?`;
      }
    }
  }
  
  ngOnInit() {
  }

  onConfirmClick(): void {
    if(this.dailogIsUsedFor =="redeemRequest"){
      this.DeleteData = {
        delete: true,
        cancelReason:this.reasonOfCancel
      };
      if(this.reasonOfCancel!='')
          this.dialogRef.close(this.DeleteData);
      else
        this.errMsg = true
          
    }else{
      this.DeleteData = {
        delete: true
      };
      this.dialogRef.close(this.DeleteData);
    }
    
  }
}
