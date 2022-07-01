import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AcceptDailogComponent } from '@fuse/Dialog/accept-dailog/accept-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { ReturnRequestsService } from './return-requests.service';
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
  selector: 'app-return-requests',
  templateUrl: './return-requests.component.html',
  styleUrls: ['./return-requests.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})



export class ReturnRequestsComponent implements OnInit {
  displayedColumns: string[] = ['sr',  'name','date', 'buyer','seller','action' ];
  expandedElement:PeriodicElement | null;
  searchText: any;
  Enums = Enums;
  dataSource: any = this.returnRequestsService.tableData.request;
  config: any = {
    itemsPerPage : pageSize,
    currentPage : 1,
    totalItems : this.returnRequestsService.tableData.recordCount
  }
  @ViewChild('search', { static: true })
  search: ElementRef;
  approvalStatus: any;




 



  constructor(private returnRequestsService:ReturnRequestsService,
              private commonService:CommonService,
              private dialog:MatDialog,
              private snackBar:MatSnackBar,
              private _fuseProgressBarService: FuseProgressBarService,) {
    
console.log("this.returnRequestsService.tableData.request=>",this.returnRequestsService.tableData.request);



    
    
   }
   
  ngOnInit() {
  }

  clearSearch() {
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()
    this.searchText = '';
    this.filterData('')
    
  }
  approvalFilter(event){
    this.approvalStatus =  event.value;
    this.fetchDataInTable(1,this.searchText,this.approvalStatus)
  }
  filterData(input) {
    this.fetchDataInTable(1,this.searchText,this.approvalStatus)
  }
  pageChanged(pageNumber) {
    this.fetchDataInTable(pageNumber,this.searchText,this.approvalStatus)
  }
  requestAction(id,status){
    this.dialog.open(AcceptDailogComponent, {
      minHeight: '120px',
      width: '420px',
      data: {
        status: status,
        module: 'productMangage'
      }
    }).afterClosed().subscribe((result: any) => {
      console.log(result.cancelReason);
      
      if (result.delete) {
        this.commonService.ChangeReturnRequestStatus(id,status,result.cancelReason).then((result:any)=>{
          this.snackBar.open(result.message,"Okay",{duration:2000})
          if(result.status == 200){
            this.fetchDataInTable(this.config.currentPage,this.searchText,this.approvalStatus)
          }
        })
      }
    })
  }
  fetchDataInTable(pageNumber?,search?,approvalStatus?){
    this._fuseProgressBarService.show()
    this.commonService.GetAllReturnRequest(pageNumber,search,approvalStatus).then((result:any)=>{
      if(result.status == 200){
        this.dataSource = result.data.request;
        this.config.currentPage = result.data.pageIndex;
        this.config.totalItems = result.data.recordCount;
        this._fuseProgressBarService.hide()
      }
    })
  }
}
