import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AcceptDailogComponent } from '@fuse/Dialog/accept-dailog/accept-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { ELEMENT_DATA, prod_data } from 'app/main/dashboard/project/data.';
import { ProductManageService } from './product-manage.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {
  ApprovalStatus = 2;
  searchText: any;
  Enums = Enums;
  dataSource: any = this.productManageService.tableData.product;
  config: any = {
    itemsPerPage: pageSize,
    currentPage:1,
    totalItems:this.productManageService.tableData.recordCount
  }
  @ViewChild('search', { static: true })
  search: ElementRef;
  
  productsDisplayedColumns: string[] = ['sr', 'img', 'name', 'category', 'seller', 'condition',  'postDate', 'price', 'action'];
  DisplayedColumnsTrending: string[] = ['sr', 'img', 'name', 'category', 'seller', 'condition',  'postDate', 'price', 'action'];
  
  tabIndex: number = 0;
  timeFilter: any;
  categoryIdFilter: any;
  constructor(public productManageService: ProductManageService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService,
    private dailog: MatDialog
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
  TimePeriodFilter(event){
    this.timeFilter =  event.value
    this.fetchDataProducts(this.config.currentPage,this.tabIndex,'',this.searchText,this.timeFilter
    ,this.categoryIdFilter)
  }
  categoryFilter(event){

    this.categoryIdFilter =  event.value
    this.fetchDataProducts(this.config.currentPage,this.tabIndex,'',this.searchText,this.timeFilter
    ,this.categoryIdFilter)
  }
  filterData(input) {
    this.fetchDataProducts(this.config.currentPage,this.tabIndex,'',this.searchText,this.timeFilter
    ,this.categoryIdFilter)
  }
  pageChanged(pageNumber) {
    this.fetchDataProducts(pageNumber,this.tabIndex,'',this.searchText,this.timeFilter
    ,this.categoryIdFilter)
  }
  ApprovalFilter(event){
    this.fetchDataProducts(this.config.currentPage,this.tabIndex,'',this.searchText,this.timeFilter
    ,this.categoryIdFilter,event.value)
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('index => ', tabChangeEvent.index);
    this.searchText ='';
    this.categoryIdFilter = '';
    this.timeFilter = '';
    this.ApprovalStatus = 2;
    this.tabIndex = tabChangeEvent.index;
    this.fetchDataProducts(1, this.tabIndex)
  }
  
  changeProductActiveStatus(id, status) {
    this.commonService.changeProductActiveStatus(id, status?0:1).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this.snackBar.open(result.message, "Okay", { duration: 2000 })
        this.fetchDataProducts(this.config.currentPage,this.tabIndex)
      }
    })
  }
  requestAction(id, status) {
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
        this.commonService.updateProductStatus(id, status,result.cancelReason).then((result: any) => {
          if (result.status == 200) {
            this.snackBar.open(result.message, "Okay", { duration: 2000 })
            this.fetchDataProducts(this.config.currentPage, 2)
          }
        })
      }
    })
  }

  fetchDataProducts(pageNumber?, tabIndex?, merchantId?, search?, timeFilter?,categoryId?,ApprovalStatus?) {
    this._fuseProgressBarService.show()
    return this.commonService.
    getProducts(pageNumber, tabIndex, merchantId, search, timeFilter,categoryId,ApprovalStatus).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        console.log("products according to tabs=>",result.data.product);
        this.dataSource = result.data.product;
        this.config.currentPage = result.data.pageIndex;
        this.config.totalItems = result.data.recordCount;
        this._fuseProgressBarService.hide()
      }
      this._fuseProgressBarService.hide()
    });
  }
}
