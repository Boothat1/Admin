import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  message: string = `Are you sure you want to ${this.data.status? 'Disable':'Enable'} this?`;
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  DeleteData;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
  if(data){
    console.log(data);
    if(data.module == 'banner')
        this.message = `Are you sure you want to ${this.data.status? 'Activate':'Deactivate'} this?`;
              else if(data.module == 'supportTicket')
      this.message = `Are you sure you want to ${this.data.status? 'complete':'Inactive'} this?`;
    

    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
  }
}
 ngOnInit() {
 }

onConfirmClick(): void {
  this.DeleteData = {
     delete: true,
  };
  this.dialogRef.close(this.DeleteData);
}
}
