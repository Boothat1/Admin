import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { ProductDetailService } from './product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  paramsId: any;
  sizes: any;

  constructor(public commonService:CommonService, 
              public detailService:ProductDetailService,
              public activatedRoute:ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe((param:any)=>{
      console.log(param);
      this.paramsId = param.id
      if(this.paramsId)
        this.detailService.getSingleProduct(this.paramsId)
    })
   }

  ngOnInit() {
    
    
    
  }

}
