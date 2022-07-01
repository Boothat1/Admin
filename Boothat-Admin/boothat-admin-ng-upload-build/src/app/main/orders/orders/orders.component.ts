import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['sr',  'shopProfile', 'dateTime', 'price', 'buyer', 'status'];
  searchText: any;
  Enums = Enums;
  dataSource: any = this.ordersService.tableData.orders;
  config: any = {itemsPerPage:pageSize,currentPage:1,totalItems:this.ordersService.tableData.recordCount}
  @ViewChild('search', { static: true })
  search: ElementRef;
  timeFilter: any;
  tabIndex: any;
  constructor(private ordersService :OrdersService,
              private commonService:CommonService,
              private _fuseProgressBarService:FuseProgressBarService) {
   
   }

  ngOnInit() {
  }

  clearSearch() {
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()
    this.searchText = '';
    this.filterData('')
   
  }
  TimePeriodFilter(event){
    this.timeFilter =  event.value
    this.fetchDataInTable(this.config.currentPage, this.tabIndex,this.searchText,this.timeFilter)
  }
  filterData(input) {
    this.fetchDataInTable(this.config.currentPage, this.tabIndex,this.searchText,this.timeFilter)
  }
  orderHistoryFilter(event){
    this.fetchDataInTable(this.config.currentPage, this.tabIndex,this.searchText,this.timeFilter)
  }
  pageChanged(pageNumber) {
    this.fetchDataInTable(pageNumber, this.tabIndex,this.searchText,this.timeFilter)
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('index => ', tabChangeEvent.index);
    this.searchText ='';
    
    this.timeFilter = '';
    
    this.tabIndex = tabChangeEvent.index;
    
    this.fetchDataInTable(1, this.tabIndex,this.searchText,this.timeFilter)
  }

  fetchDataInTable(pageNumber?, tabNumber?, search?, timeFilter?,){
    this._fuseProgressBarService.show()
    this.commonService.getAllOrderList(pageNumber, tabNumber, search, timeFilter).then((result:any)=>{
      if(result.status == 200){
        this._fuseProgressBarService.hide()
        this.dataSource = result.data.orders;
        this.config.currentPage = result.data.pageIndex;
        this.config.totalItems = result.data.recordCount;
      }
      this._fuseProgressBarService.hide()      
    })
  }
}
