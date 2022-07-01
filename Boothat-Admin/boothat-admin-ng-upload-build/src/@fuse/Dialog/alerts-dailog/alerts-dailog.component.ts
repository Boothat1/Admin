import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModeratorRequestDailogComponent } from '../moderator-request-dailog/moderator-request-dailog.component';
import { UsersListDailogComponent } from '../users-list-dailog/users-list-dailog.component';
@Component({
  selector: 'app-alerts-dailog',
  templateUrl: './alerts-dailog.component.html',
  styleUrls: ['./alerts-dailog.component.scss']
})
export class AlertsDailogComponent implements OnInit {
  QRCode: any;

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public matDialogRef: MatDialogRef<AlertsDailogComponent>) {
      console.log(data.QRCode);
      if(data.QRCode)
      this.QRCode = data.QRCode
    }

  ngOnInit() {
    console.log();
    
  }
  closeDialog(){
    this.matDialogRef.close()
  }
}
