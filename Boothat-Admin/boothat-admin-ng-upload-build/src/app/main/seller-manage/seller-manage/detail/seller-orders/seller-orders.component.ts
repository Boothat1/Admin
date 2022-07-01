import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pageSize } from '@fuse/utils/systemEnums';
import { SellerDetailService } from '../seller-detail.service';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent implements OnInit {
  displayedColumns: string[] = ['sr',  'shopProfile', 'dateTime', 'price', 'buyer', 'status'];
  config:any = {
    currentPage:1,
    itemsPerPage:pageSize,

  };
  dataSource :any  = [];
  paramsId: any;

  
  constructor(private _detailService:SellerDetailService,
              private router:ActivatedRoute) {
                this.router.queryParams.subscribe((param:any)=>{
                  if(param){
                  this.paramsId = param.id;
                  this._detailService.sellerAllOrders(this.paramsId)
                  }
                })
    
    this._detailService.sellerOrders.subscribe((result:any)=>{
      this.dataSource = result.orders;
      this.config.totalItems = result.recordCount;
      this.config.currentPage = result.pageIndex
    })
    
  }

  ngOnInit() {
  }
  pageChanged(pageNumber){
    this._detailService.sellerAllOrders(this.paramsId,pageNumber)     
  }
}
