import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { ComplaintsService } from '../complaints.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

export interface PeriodicElement {
  index:number;
  product_name: string;
  title: string;
  created_date: Date;
  userName: string;
  shopName: string;
  description:string;
}


@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ComplaintsComponent implements OnInit {
  config: any = {
    currentPage: 1,
    itemsPerPage: pageSize,
    totalItems: this.complaintsService.tableData.recordCount 
  }
  @ViewChild('search', { static: true })
  search: ElementRef;
  Enums = Enums;
  searchText: any;
  timeFilter: any;
  TABLE_DATA: PeriodicElement[] = this.complaintsService.tableData.complaint;
  

  dataSource = this.TABLE_DATA;
  columnsToDisplay: string[] = ['sr', 'products', 'dateTime', 'buyerName', 'sellerName',"action"];
  expandedElement: PeriodicElement | null;
  
  
  
  constructor(private commonService:CommonService,
              private snackBar : MatSnackBar,
              private complaintsService:ComplaintsService,
              private _fuseProgressBarService: FuseProgressBarService,) {
                console.log("complaint=>",this.complaintsService.tableData.complaint);
                
  }

  ngOnInit() {
  }
  clearSearch() {
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()
    this.searchText = '';
    this.filterData('')
  
  }
  filterData(value) {

    this.fetchDataInTable(1,this.searchText,this.timeFilter)
  }
  pageChanged(pageNumber) {

    this.fetchDataInTable(pageNumber,this.searchText,this.timeFilter)
  }
  TimePeriodFilter(event) {
    console.log(event);

    this.timeFilter = event.value;
    this.fetchDataInTable(1,this.searchText,this.timeFilter)
  }

  fetchDataInTable(pageNumber?,searchKey?,timeFilter?){
    this._fuseProgressBarService.show()
    this.commonService.getAllComplaintList(pageNumber,searchKey,timeFilter).then((result:any)=>{
      if(result.status == 200){
        this.dataSource = result.data.complaint;
        this.config.currentPage = result.data.recordCount;
        this._fuseProgressBarService.hide()
      }
    })
  }
}

 