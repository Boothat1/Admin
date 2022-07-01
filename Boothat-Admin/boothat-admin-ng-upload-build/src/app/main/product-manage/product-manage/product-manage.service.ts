import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManageService implements Resolve<any> {
  tableData: any;
  productCategory: any;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
      //  this.getUser()
      this.getProducts(),this.getProductCategory()
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });
  }
  constructor(private commonService:CommonService) { console.log('Hello there'); }
  getProducts(){
   return this.commonService.getProducts(1,0,'','','','',2).then((result:any)=>{
      console.log(result);  
      if(result.status == 200){
        this.tableData = result.data
      } 
    });   
  }
  getProductCategory(){
    return this.commonService.getProductCategory().then((result:any)=>{
      console.log(result);
      this.productCategory = result.data.category
    })
  }
}
