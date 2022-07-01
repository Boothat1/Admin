import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { ELEMENT_DATA } from 'app/main/dashboard/project/data.';
import { SellerManageService } from '../seller-manage.service';

@Component({
  selector: 'app-seller-manage',
  templateUrl: './seller-manage.component.html',
  styleUrls: ['./seller-manage.component.scss']
})
export class SellerManageComponent implements OnInit {
  timeFilter: any;
  config: any = {};
  displayedColumns: string[] = ['sr','images','name','username','joinDate','mobile','country','status','action'];
  dataSource = this.sellerManageService.merchants.users;
  Enums =Enums;
  @ViewChild('search', { static: true })
  search: ElementRef;
  searchText:any;


  constructor(public sellerManageService:SellerManageService,
    private _fuseProgressBarService:FuseProgressBarService,
    private _commonService:CommonService,
    private snackBar:MatSnackBar
    ) {
      this.config.currentPage =1;
      this.config.itemsPerPage = pageSize;
      this.config.totalItems = this.sellerManageService.merchants.recordCount
   }
  
  ngOnInit() {
  }

  clearSearch(){
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()
    this.searchText ='';
    this.filterData('')
  }

  filterData(input){
    this.fetchTableData(1, input.value, this.timeFilter)
  }

  TimePeriodFilter(event){
    console.log(event);
    
    this.timeFilter = event.value;
    this.fetchTableData(1, this.searchText, this.timeFilter)
  }

  pageChanged(pageNumber){
    this.fetchTableData(pageNumber)
  }
  fetchTableData(pageNumber?, searchText?, timeFilter?){
    this._fuseProgressBarService.show()
    console.log(this.searchText);
    
    this._commonService.getMerchants(pageNumber, searchText, timeFilter).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this.dataSource = result.data.users
        this.config.currentPage = result.data.pageIndex;
        this.config.totalItems = result.data.recordCount;
        this._fuseProgressBarService.hide()
      }
      this._fuseProgressBarService.hide()
    })
  }

  upadateStatus(id,status){
    this._commonService.updateStatus(id,status?0:1,2).then((result:any)=>{
      console.log(result);
      if(result.status == 200){
        this.snackBar.open(result.data.message,"Okay",{duration: 2000});
        this.fetchTableData(this.config.currentPage)
      }else{
        this.snackBar.open(result.data.message,"Okay",{duration: 2000});
      }
    })
  }
  
}
