import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-moderator-request-dailog',
  templateUrl: './moderator-request-dailog.component.html',
  styleUrls: ['./moderator-request-dailog.component.scss']
})
export class ModeratorRequestDailogComponent implements OnInit {

  constructor(public dialog: MatDialog,public matDialogRef: MatDialogRef<ModeratorRequestDailogComponent>) { }

  ngOnInit() {
  }
  closeDialog(){
    this.matDialogRef.close();
  }
  confirmDailog(){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '120px',
      width: '420px',
    });
  }
}
