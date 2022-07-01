import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertsDailogComponent } from '@fuse/Dialog/alerts-dailog/alerts-dailog.component';

const ELEMENT_DATA: any = [
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  {report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
  { report_type:'fire',reported_plants:'Plant Name',user:'Normal User',date:'17/08/2021',city:'mumbai'},
];

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  p: number = 1;
  config: any = {};
  displayedColumns: string[] = ['report_type','reported_plants','user','date','city'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openUserDailog(element): void {
    let dialogRef = this.dialog.open(AlertsDailogComponent, {
      height: '620px',
      width: '420px',
    });
    console.log("1111111111111",element)
  }
}
