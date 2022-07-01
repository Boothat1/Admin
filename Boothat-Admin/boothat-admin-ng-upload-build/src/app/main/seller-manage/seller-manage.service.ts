import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerManageService  implements Resolve<any>{
  merchants: any;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {

      Promise.all([
      //  this.getUser()
      this.getMerchants()
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });
  }
  constructor(private _commonService:CommonService) { }
  
  getMerchants(){
    return new Promise((resolve, reject) => {
      this._commonService.getMerchants().then((result: any) => {
        console.log("result", result);
        this.merchants = result.data;   
        resolve('');
      })
    }); 
  }
}
