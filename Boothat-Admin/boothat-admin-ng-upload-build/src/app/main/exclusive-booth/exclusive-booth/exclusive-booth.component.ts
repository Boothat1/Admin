import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AcceptDailogComponent } from '@fuse/Dialog/accept-dailog/accept-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { prod_data } from 'app/main/dashboard/project/data.';
import { ProductManageService } from 'app/main/product-manage/product-manage/product-manage.service';
import { ExclusiveBoothModule } from '../exclusive-booth.module';
import { ExclusiveBoothService } from './exclusive-booth.service';

@Component({
  selector: 'app-exclusive-booth',
  templateUrl: './exclusive-booth.component.html',
  styleUrls: ['./exclusive-booth.component.scss']
})
export class ExclusiveBoothComponent implements OnInit {
  approvalStatus = 2;
  searchText: any;
  Enums = Enums;
  dataSource: any = this.exclusiveBoothService.tableData.booth;
  config: any = {}
  @ViewChild('search', { static: true })
  search: ElementRef;
  tabIndex: number = 0;
  timeFilter: any;
  displayedColumns = ['sr', 'seller', 'plan', 'validity', 'products', 'action']
  constructor(public productManageService: ProductManageService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService,
    private dailog: MatDialog,
    private exclusiveBoothService: ExclusiveBoothService) {
      
    this.config.itemsPerPage = pageSize;
    this.config.currentPage = 1;
    this.config.totalItems = this.exclusiveBoothService.tableData.recordCount;
  }

  ngOnInit() {
  }
  clearSearch() {
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()    
    this.searchText = '';
    this.filterData('')
  }
  ApprovalFilter(event){
    this.fetchDataTable(this.config.currentPage,this.tabIndex,this.searchText,this.timeFilter,event.value)
  }
  TimePeriodFilter(event) {
    this.timeFilter = event.value
    this.fetchDataTable(this.config.currentPage,this.tabIndex,this.searchText,this.timeFilter,this.approvalStatus)
  }
  filterData(input) {
    this.fetchDataTable(this.config.currentPage,this.tabIndex,this.searchText,this.timeFilter,this.approvalStatus)
  }
  pageChanged(pageNumber) {
    this.fetchDataTable(pageNumber)
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('index => ', tabChangeEvent.index);
    this.searchText = '';
    this.timeFilter = '';
    this.approvalStatus = 2;
    this.tabIndex = tabChangeEvent.index;
    this.fetchDataTable(1, this.tabIndex)
  }
  fetchDataTable(pageNumber?, tabIndex?, searchText?, timeFilter?, approvalStatus?) {
    this._fuseProgressBarService.show()
    this.commonService.getAllBooth(pageNumber, tabIndex, searchText, timeFilter, approvalStatus).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this.dataSource = result.data.booth;
        this.config.currentPage = result.data.pageIndex;
        this.config.totalItems = result.data.recordCount;
        this._fuseProgressBarService.hide()
      }
      this._fuseProgressBarService.hide()
    })
  }
  requestAction(id,status){
    this.dailog.open(AcceptDailogComponent, {
      minHeight: '120px',
      width: '420px',
      data: {
        status: status,
        module: 'productMangage'
      }
    }).afterClosed().subscribe((result: any) => {
      console.log(result.cancelReason);
      
      if (result.delete) {
        this.commonService.changeApprovalBooth(id, status,result.cancelReason).then((result: any) => {
          if (result.status == 200) {
            this.snackBar.open(result.message, "Okay", { duration: 2000 })
            this.fetchDataTable(this.config.currentPage, this.tabIndex)
          }
        })
      }
    })
  }
  changeActiveStatus(id,status){
    this.commonService.enableDisableBooth(id,status == 1? 0:1).then((result: any) => {
      if(result.status == 200){
        this.snackBar.open(result.data.message, "Okay", { duration:2000})
        this.fetchDataTable(this.config.currentPage, this.tabIndex)
      }
    })
  }
}
