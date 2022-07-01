import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { join } from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService implements Resolve<any>{
  singleProduct: any;
  Productphotos: any;
  sizes: any = [];
  colors: any;


  constructor(private commonService:CommonService, private activatedRoute: ActivatedRoute) { 
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
      
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });
  }
  
  getSingleProduct(id){
    return this.commonService.getSingleProduct(id).then((result:any)=>{
      console.log(result);
      this.singleProduct = result.data.product
      this.Productphotos=  result.data.product.photos_json.split(',')   
     this.sizes =  this.arrReturnCommaSepStr(result.data.product.size)
     this.colors = this.arrReturnCommaSepStr(result.data.product.color)
      // result.data.product.size.forEach(element => {
      //   if(element.name!= undefined)
      //     this.sizes.push(element.name)        
      // });      
      // this.sizes = this.sizes.join(','+' ')
      // console.log(this.sizes);
      
    })
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
