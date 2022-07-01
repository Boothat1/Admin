import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { WalletService } from './wallet.service';

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
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class WalletComponent implements OnInit {
  displayedColumns: string[] = ['sr',  'transId', 'date', 'name', 'type',  'amount',  'status','view'];
  expandedElement:PeriodicElement | null;
  searchText: any;
  Enums = Enums;
  dataSource: any = this.walletService.tableData.transaction;
  config: any = {}
  @ViewChild('search', { static: true })
  search: ElementRef;
  timeFilter: any;
  tabIndex: any;
  constructor(private walletService:WalletService,
              private commonService:CommonService,
              private _fuseProgressBarService: FuseProgressBarService,
              private snackBar:MatSnackBar,) {
    this.config.itemsPerPage = pageSize;
    this.config.currentPage = 1;
    this.config.totalItems = this.walletService.tableData.recordCount;
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
  pageChanged(pageNumber) {
    this.fetchDataInTable(pageNumber, this.tabIndex,this.searchText,this.timeFilter)
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('index => ', tabChangeEvent.index);
    this.searchText ='';
    
    this.timeFilter = '';
    
    this.tabIndex = tabChangeEvent.index+1 == 2? 1:2;
    console.log("this.tabIndex",this.tabIndex);
    
    this.fetchDataInTable(1, this.tabIndex)
  }

  fetchDataInTable(pageNumber?,userType?,searchKey?,timeFilter?){
    this._fuseProgressBarService.show()
    this.commonService.getAllTransactionList(pageNumber,userType,searchKey,timeFilter).then((result:any)=>{
      if(result.status == 200){
        this._fuseProgressBarService.hide()
        this.dataSource = result.data.transaction;
        this.config.currentPage = result.data.pageIndex;
        this.config.totalItems = result.data.recordCount;
      }
    }).catch((err)=>{
      console.log("Api failed",err);
      
      this.snackBar.open('Something went wrong',"Okay",{duration:2000})
      this._fuseProgressBarService.hide()
    })

  }
}
