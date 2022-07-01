import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ModeratorRequestDailogComponent } from '../moderator-request-dailog/moderator-request-dailog.component';
import { UsersListDailogComponent } from '../users-list-dailog/users-list-dailog.component';
@Component({
  selector: 'app-group-dailog',
  templateUrl: './group-dailog.component.html',
  styleUrls: ['./group-dailog.component.scss']
})
export class GroupDailogComponent implements OnInit {

  constructor(public dialog: MatDialog,
    public matDialogRef: MatDialogRef<GroupDailogComponent>) { }

  ngOnInit() {
  }
  openUsers(){
    // this.matDialogRef.close()
    let dialogRef = this.dialog.open(UsersListDailogComponent, {
      height: '85vh',
      width: '80vw',
    });
  }
  closeDialog(){
    this.matDialogRef.close()
  }
  confirmDailog(){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '120px',
      width: '420px',
    });
  }
}
