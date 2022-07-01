import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import {  prod_data } from 'app/main/dashboard/project/data.';
import { BuyerDetailService } from './buyerDetail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})

export class DetailComponent implements OnInit {
  Enums = Enums
  singleUser: any;
  sellerForm :FormGroup
  config:any =  {
    currentPage:1,
    itemsPerPage:pageSize
  }
  paramsId: any;
  detailPageId: any;
  dataSource:any;
  enum = Enums;
  displayedColumns: string[] = ['sr',  'shopProfile', 'dateTime', 'price', 'buyer', 'status'];

  
  constructor( public commonService:CommonService,
    private activatedRoute: ActivatedRoute,
    public detailService:BuyerDetailService
    ) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.paramsId = params.id
        if(this.paramsId){
          this.fetchData(this.paramsId);
             
        }
       });

    }
 
  
  ngOnInit() {
    
  }

  pageChanged(pageNumber){
    this.fetchData(this.paramsId,pageNumber)
  }


 async fetchData(id?,pageNumber?){
    await this.commonService.getSingleUser(id,pageNumber).then((result:any)=>{
        if(result.status == 200){
            this.singleUser = result.data;
            this.dataSource = result.data.orders;      
            this.config.totalItems = this.singleUser.recordCount;        
        }
    })
  }
}
