import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';
import { pageSize } from '@fuse/utils/systemEnums';
import { SellerDetailService } from '../seller-detail.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.scss']
})
export class SellerProductsComponent implements OnInit {
  dataSource :any  = [];
  displayedColumns: string[] = ['sr','img','name','username','mobile','city','status'];
  
  config:any = {
    currentPage:1,
    itemsPerPage:pageSize,

  };
  paramsId: any;
  // searchText: any;
  // timeFilter: any;
  tableData: any;
  constructor(
              public commonService:CommonService,
              public detailService:SellerDetailService,
              private activatedRoute: ActivatedRoute,) { 

                this.activatedRoute.queryParams.subscribe((result:any)=>{  
                  this.paramsId = result.id
                  if(this.paramsId){
                    this.detailService.getProductsOfMerchant(1,'',this.paramsId)
                  }
                  
                })

                this.detailService.tableData.subscribe((result:any)=>{
                    this.tableData = result;
                    this.dataSource = result.product;
                    this.config.totalItems = result.recordCount;
                })
              }

  ngOnInit() {

  }


  
  

  pageChanged(pageNumber){
    this.detailService.getProductsOfMerchant(pageNumber,'',this.paramsId)      
  }
  

}
