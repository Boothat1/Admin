import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ConfirmationDialogComponent } from '@fuse/Dialog/confirmation-dialog/confirmation-dialog.component';
import { DeleteDailogComponent } from '@fuse/Dialog/delete-dailog/delete-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { prod_data } from 'app/main/dashboard/project/data.';
// import { OffersPromoService } from 'app/main/offers-promo/offers-promo/offers-promo.service';
import { PromoCodeService } from './promo-code.service';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.scss']
})
export class PromoCodeComponent implements OnInit {
  orderBy: number = 1;
  @ViewChild('search', { static: true })
  search: ElementRef;
  p: number = 1;
  config: any = {
    itemsPerPage:pageSize,
    currentPage:1,
    totalItems: this.promoCodeService.tableData.recordCount
  };
  searchText = "";
  displayedColumns: string[] = ['sr',  'promoCode','userType', 'promoType','discount','publish-date', 'action'];
  dataSource = this.promoCodeService.tableData.Promo;
  Enums = Enums
  tableDataMsg: any;
  timeFilter: any;
  constructor(
              // private offersPromoService:OffersPromoService,
              private _fuseProgressBarService:FuseProgressBarService,
              private _commonService:CommonService,
              private promoCodeService:PromoCodeService,
              private dailog:MatDialog,
              private _snackBar:MatSnackBar) { 
    
  }

  ngOnInit( ) {
  }

  pageChanged(pageNumber) {
    this.fetchTableData(pageNumber,this.searchText,this.timeFilter);
  }
  clearSearch() {
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()
    this.searchText = '';
    this.filterData('')
  }
  filterData(input) {
    this.fetchTableData(1,input.value,this.timeFilter)
  }
  TimePeriodFilter(e) {
    this.timeFilter = e.value
    this.fetchTableData(1,this.searchText,this.timeFilter);
  }
  changeStatus(id,status){
    this._commonService.changePromoActiveStatus(id, status?0:1).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this._snackBar.open(result.data.message, "Okay", { duration: 2000 })
        this.fetchTableData(this.config.currentPage)
      }
    })
  }
  
  fetchTableData(pageNumber?, searchText?,timeFilter?) {
    this._fuseProgressBarService.show()
    this._commonService.getPromoCodes(pageNumber, searchText,timeFilter).then((result: any) => {
      if(result.status  ==200){    
        // console.log(result);
        this.dataSource = result.data.Promo;
        this.config.currentPage = result.data.pageIndex;
        this.config.totalItems = result.data.recordCount;
        this._fuseProgressBarService.hide()
      }
      this._fuseProgressBarService.hide()
    })
  }
}
