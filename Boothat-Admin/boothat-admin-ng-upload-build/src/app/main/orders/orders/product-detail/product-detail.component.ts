import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
// import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderDetailService } from '../order-detail/order-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productDetail: any;
  productPhotos: any = [];
  sizes: string;
  colors: string;

  constructor(public commonService:CommonService,
              private orderDetailService:OrderDetailService,
              private router:Router) { 
                this.orderDetailService.productObj.subscribe((result:any)=>{
                  this.productDetail = result;
                  console.log("this.orderDetailService.productObj",result);
                  if(this.productDetail == null){
                    this.router.navigate(['/orders'])
                  }
             

               
                  this.productPhotos = result.photos_json.split(',')   
                  this.sizes =  this.arrReturnCommaSepStr(result.size)
                  this.colors =  this.arrReturnCommaSepStr(result.size)
                })
  }

  ngOnInit() {
  }

  arrReturnCommaSepStr(arr){
    console.log(arr);
    
    let tempArr = [];
    arr.forEach(element => {
      if(element.name!= undefined)
        tempArr.push(element.name)
    });
    return tempArr.join(',' + ' ');

  }
  
}
