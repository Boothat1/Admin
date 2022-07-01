import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

const ELEMENT_DATA: any = [
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen',images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'Hydrogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'drogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
  {name: 'drogen', images:'assets/images/tia/user_images2.png',joinDate:'02/06/1997',mobile:1234567890,city:'indoor'},
];
@Component({
  selector: 'app-users-list-dailog',
  templateUrl: './users-list-dailog.component.html',
  styleUrls: ['./users-list-dailog.component.scss']
})
export class UsersListDailogComponent implements OnInit {
  p: number = 1;
  config: any = {};
  displayedColumns: string[] = ['sr','images','name','joinDate','mobile','city','action'];
  dataSource = ELEMENT_DATA;
  selectData:any= [
    {id:1,name:'this week'},
    {id:2,name:'last week'},
    {id:3,name:'last month'},
    {id:4,name:'last year'}
  ]
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  confirmDailog(){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '120px',
      width: '420px',
    });
  }
  // openUserDailog(e){
  //   let dialogRef = this.dialog.open(UserDailogComponent, {
  //     height: '620px',
  //     width: '420px',
  //   });
  // }
}
