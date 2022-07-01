import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class TableSortingService {
  routeEndPoint: any;
  sortColName: any;
  currentPage: any;
  tableName: any;
  orderBy: any;
  constructor(private _commonService: CommonService,
    public activatedRoute: ActivatedRoute) {
  }

  sortTable() {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if(params){
    //     // console.log(params); 
    //   this.sortColName = params.column
    //   this.currentPage = params.currentPage
    //   this.tableName = params.Tname
    //   this.orderBy = params.orderBy
    //   console.log("order in function", params);
    //   }
    // })
    // return new Promise<void>((resolve, reject) => {
    //   console.log("table name", this.tableName);
    //   if (this.tableName == "merchants") {
    //     this._commonService.getMerchants(this.currentPage, '', this.sortColName, this.orderBy).then((result: any) => {
    //       console.log('xxxxxxxxxxxxxxx',this.orderBy);
          
    //       if (result.status)
    //         resolve(result)
    //     })
    //   }
    //   // else if (tableName== "customers") {
    //   //   console.log("in sorting function", this.orderBy);

    //   //   this._commonService.getCustomer(currentPage, '', colName, orderBy).then((result: any) => {
    //   //     console.log('xxxxxxxxxxxxxxx',this.orderBy);
    //   //     if (result.status)
    //   //       resolve(result)
    //   //   })
    //   // }
    //   else if (this.tableName == 'redeem-requests') {
    //     this._commonService.getKYCRequests(this.currentPage, '', this.sortColName, this.orderBy).then((result: any) => {
    //       if (result.status)
    //         resolve(result)
    //     })
    //   }
    //   else if (this.tableName == 'offers-promo') {
    //     this._commonService.getOffers(this.currentPage, '', this.sortColName, this.orderBy).then((result: any) => {
    //       if (result.status)
    //         resolve(result)
    //     })
    //   }
    //   else if (this.tableName == 'points-transactions') {
    //     this._commonService.getPoints(this.currentPage, '', this.sortColName, this.orderBy).then((result: any) => {
    //       if (result.status)
    //         resolve(result)
    //     })
    //   }
    //   else if (this.tableName == 'category') {
    //     this._commonService.getCategory(this.currentPage, '', this.sortColName, this.orderBy).then((result: any) => {
    //       if (result.status)
    //         resolve(result)
    //     })
    //   }
    //   else if (this.tableName == 'subCategory') {
    //     this._commonService.getSubcategory(this.currentPage, '', this.sortColName, this.orderBy).then((result: any) => {
    //       if (result.status)
    //         resolve(result)
    //     })
    //   }

    // })

  }
}
