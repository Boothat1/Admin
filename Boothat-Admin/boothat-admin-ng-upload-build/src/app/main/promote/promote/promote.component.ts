import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AcceptDailogComponent } from '@fuse/Dialog/accept-dailog/accept-dailog.component';
import { ConfirmationDialogComponent } from '@fuse/Dialog/confirmation-dialog/confirmation-dialog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { duration } from 'moment';
import { PromoteService } from './promote.service';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.scss']
})
export class PromoteComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'plan', 'startDate', 'endDate', 'productPrice', 'action'];
  displayedColumnsBanners: string[] = ['sr', 'image', 'plan', 'startDate', 'endDate', 'type', 'productPrice', 'action'];
  displayedColumnsTrending: string[] = ['sr', 'name', 'plan', 'startDate', 'endDate', 'productPrice', 'action'];
  searchText: any;
  Enums = Enums;
  dataSource: any = this.promoService.tableData.product;
  config: any = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.promoService.tableData.recordCount
  }
  @ViewChild('search', { static: true })
  search: ElementRef;
  timeFilter: any;
  tabIndex: any = 0;
  bannerType: number;
  reqStatus: any;
  constructor(
    private promoService: PromoteService,
    private _commonService: CommonService,
    private _fuseProgressBarService: FuseProgressBarService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {

  }

  ngOnInit() {
  }
  clearSearch() {
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()
    this.searchText = '';
    this.filterData('')
  }
  requestFilter(event) {
    console.log("reqStatus", event.value);
    if (this.tabIndex == 0)
      this.getAllExclusiveBooth(1, this.searchText, this.timeFilter, this.reqStatus)
    else if (this.tabIndex == 1){
      if (event.value == 6) {
        this.bannerType = 3
      } else if(event.value == 3){
        this.bannerType = 2
      }else{
        this.bannerType = 1
      }
    this.getBanners(1, this.searchText, this.timeFilter, this.bannerType, this.reqStatus)
    }else if (this.tabIndex == 2)
      this.getAllTrendingProduct(1, this.searchText, this.timeFilter, this.reqStatus)
  }
  TimePeriodFilter(event) {
    this.timeFilter = event.value
    if (this.tabIndex == 0) {
      this.getAllExclusiveBooth(1, this.searchText, this.timeFilter, this.reqStatus)
    } else if (this.tabIndex == 1) {
      this.getBanners(1, this.searchText, this.timeFilter, this.bannerType, this.reqStatus)
    } else if (this.tabIndex == 2) {
      this.getAllTrendingProduct(1, this.searchText, this.timeFilter, this.reqStatus)
    }
  }
  filterData(input) {
    console.log("input", input.value);

    if (this.tabIndex == 0) {
      this.getAllExclusiveBooth(1, input.value, this.timeFilter, this.reqStatus)
    } else if (this.tabIndex == 1) {
      this.getBanners(1, input.value, this.timeFilter, this.bannerType, this.reqStatus)
      this.searchText = input.value
    } else if (this.tabIndex == 2) {
      this.getAllTrendingProduct(1, input.value, this.timeFilter, this.reqStatus)
    }
  }
  pageChanged(pageNumber) {
    if (this.tabIndex == 0) {
      this.getAllExclusiveBooth(pageNumber,this.searchText, this.timeFilter, this.reqStatus)
    }
    else if (this.tabIndex == 1) {
      this.getBanners(pageNumber,this.searchText, this.timeFilter, this.bannerType, this.reqStatus)
    }
    else if (this.tabIndex == 2) {
      this.getAllTrendingProduct(pageNumber,this.searchText, this.timeFilter, this.reqStatus)
    }

  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('index => ', tabChangeEvent.index);
    this.searchText = '';
    this.timeFilter = '';
    this.reqStatus = ''
    this.tabIndex = tabChangeEvent.index;

    if (this.tabIndex == 0) {
      this.getAllExclusiveBooth(1)
    }
    else if (this.tabIndex == 1) {
      this.getBanners(1)
    }
    else if (this.tabIndex == 2) {
      this.getAllTrendingProduct(1)
    }

  }


  enableDisableBanner(id, status) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minHeight: '120px',
      width: '420px',
      data: {
        status: status,
        module: 'banner'
      }
    }).afterClosed().subscribe((result: any) => {

      console.log(result.delete);
      if (result.delete) {
        this._fuseProgressBarService.show()
        this._commonService.enableDisableBanner(id, status).then((result: any) => {
          console.log(result);
          if (result.status == 200) {
            this.snackbar.open(result.message, "Okay", { duration: 2000 })
            this.getBanners(this.config.currentPage,this.searchText, this.timeFilter, this.bannerType, this.reqStatus)
            this.snackbar.open(result.data.message, "Okay", { duration: 2000 })
            this._fuseProgressBarService.hide()
          }
          this._fuseProgressBarService.hide()
        })
      }

    })
  }


  getBanners(pageNumber?, search?, timeFilter?, bannerType?, reqStatus?) {
    this._fuseProgressBarService.show()
    return this._commonService.getBanners(pageNumber, search, timeFilter, bannerType, reqStatus).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this._fuseProgressBarService.hide()
        this.dataSource = result.data.banners
        this.config.totalItems = result.data.recordCount;
        this.config.itemsPerPage = 6;
        this.config.currentPage = result.data.pageIndex;
      }
      this._fuseProgressBarService.hide()
    })
  }

  getAllTrendingProduct = (pageNumber?, search?, timeFilter?, reqStatus?) => {
    this._fuseProgressBarService.show()
    return this._commonService.getAllTrendingProduct(pageNumber, search, timeFilter, reqStatus).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this._fuseProgressBarService.hide()
        this.dataSource = result.data.product
        this.config.totalItems = result.data.recordCount;
        this.config.itemsPerPage = 10;
        this.config.currentPage = result.data.pageIndex;
      }
      this._fuseProgressBarService.hide()
    })
  }

  getAllExclusiveBooth(pageNumber?, search?, timeFilter?, reqStatus?) {
    this._fuseProgressBarService.show()
    return this._commonService.getAllExclusiveBooth(pageNumber, search, timeFilter, reqStatus).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this._fuseProgressBarService.hide()
        this.dataSource = result.data.product
        this.config.totalItems = result.data.recordCount;
        this.config.itemsPerPage = 10;
        this.config.currentPage = result.data.pageIndex;
      }
      this._fuseProgressBarService.hide()

    })
  }

  changePromoteRequestStatus(id?, reqStatus?, promoteType?, promotePlan?) {
    this.dialog.open(AcceptDailogComponent, {
      minHeight: '120px',
      width: '420px',
      data: {
        module: 'productManage',
        status: reqStatus == 1 ? 2 : 3,
        amount:true
      }
    }).afterClosed().subscribe((result: any) => {
      console.log(result.cancelReason);
      if (result.delete) {
        this._fuseProgressBarService.show()
        this._commonService.changePromoteRequestStatus(id, reqStatus, promoteType, promotePlan, result.cancelReason).then((result: any) => {
          if (result.status == 200) {
            this.snackbar.open(result.message, "Okay", { duration: 2000 })
            if (this.tabIndex == 0)
              this.getAllExclusiveBooth(this.config.currentPage)
            else if (this.tabIndex == 1)
              this.getBanners(this.config.currentPage)
            else if (this.tabIndex == 2)
              this.getAllTrendingProduct(this.config.currentPage)
          }
        })
      }
    })

  }
}
