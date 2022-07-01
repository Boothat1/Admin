import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CurrenyPlansDialogComponent } from '@fuse/Dialog/curreny-plans-dialog/curreny-plans-dialog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { SubscriptionPlansConfigService } from './subscription-plans-config.service';

@Component({
  selector: 'app-subscription-plans-config',
  templateUrl: './subscription-plans-config.component.html',
  styleUrls: ['./subscription-plans-config.component.scss']
})
export class SubscriptionPlansConfigComponent implements OnInit {
  displayedColumns: string[] = ['sr',  'country','7day','14day','30day','action'];
  searchText: any;
  Enums = Enums;
  dataSource: any = this.subscriptionPlansConfigService.tableData;
  config: any = {}
  @ViewChild('search', { static: true })
  search: ElementRef;
  timeFilter: any;
  tabIndex: any = 0;
  constructor(private commonService:CommonService,
    private dialog:MatDialog,
    private subscriptionPlansConfigService:SubscriptionPlansConfigService,
    private snackBar:MatSnackBar,
    private _fuseProgressBarService:FuseProgressBarService
    ) {
    this.config.itemsPerPage = pageSize;
    this.config.currentPage = 1;
    this.config.itemsPerPage = 30;
    
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
  }
  filterData(input) {

  }
  pageChanged(pageNumber) {

  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('index => ', tabChangeEvent.index);
    this.searchText ='';
    
    this.timeFilter = '';
    
    this.tabIndex = tabChangeEvent.index;
    this.fetchDataInTable(this.tabIndex)
    // this.fetchDataProducts(1, this.tabIndex)
  }
  editCurrency(element){
      this.dialog.open(CurrenyPlansDialogComponent,{
        minWidth:'400px',
        minHeight:'100px',
        data:{
          promoteType:this.tabIndex,
          element:element

        },
        autoFocus: false
      }).afterClosed().subscribe((result)=>{
console.log(result);
       if(result){
        this._fuseProgressBarService.show()
        this.commonService.addPramotePlanPackage(result[0]).then((result:any)=>{
          if(result.status == 200){
            this.snackBar.open(result.message,"Okay",{duration:2000})
            this.fetchDataInTable(this.tabIndex)
            this._fuseProgressBarService.hide()
          }
          this._fuseProgressBarService.hide()
        })
       }
      })
  }


  fetchDataInTable(promoType){ 
    this._fuseProgressBarService.show()
    this.commonService.getPromotePlanPackage(promoType).then((result:any)=> this.dataSource = result.data.PromotePlanPackage)
    this._fuseProgressBarService.hide()
  }
  
}
