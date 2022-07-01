import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { SellerDetailService } from './seller-detail.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  userDetail  = this.fb.group({
    first_name:[''],
    last_name:[''],
    user_name:[''],
    email:[''],
    mobile:[''],
    country:['']
  })
  Enums = Enums;
  searchText: any;
  p =1;
  @ViewChild('search', { static: true })
  search: ElementRef;
  paramsId: any;
  config:any = {
    currentPage:1,
    itemsPerPage:pageSize,

  };
  singleMerchant: any = '';
  displayedColumns: string[] = ['sr','img','name','username','mobile','city','status'];
  displayedColumnsOrders: string[] = ['sr',  'shopProfile', 'dateTime', 'price', 'buyer', 'status'];
  dataSource :any  = [];
  timeFilter: any;
  constructor(public commonService:CommonService,
    private fb:FormBuilder,
    public detailService:SellerDetailService,
    private activatedRoute: ActivatedRoute,
    private _fuseProgressbarService:FuseProgressBarService) {
      // this.activatedRoute.queryParams.subscribe((result:any)=>{  
      //   this.paramsId = result.id
      //   if(this.paramsId){
      //     // this.getProductsOfMerchant(1,'',this.paramsId)
      //     // this.detailService.getSingleMerchant(this.paramsId)
      //   }
        
      // })
   }
  
  ngOnInit() {
   
  }
  filterData(input){
    // this.getProductsOfMerchant(this.config.currentPage,'',this.paramsId,this.searchText,this.timeFilter) 
  }
  clearSearch(){
    // this.search.nativeElement.value = "";
    // this.search.nativeElement.focus()
    // this.searchText ='';
    // this.filterData('')
  }

  TimePeriodFilter(event){
    this.timeFilter = event.value;
    // this.getProductsOfMerchant(this.config.currentPage,'',this.paramsId,this.searchText,this.timeFilter) 
  }
  
}
