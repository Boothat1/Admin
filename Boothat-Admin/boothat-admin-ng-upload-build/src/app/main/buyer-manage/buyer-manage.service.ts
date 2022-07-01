import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyerManageService implements Resolve<any>{
  users: any;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {

      Promise.all([
       this.getUser()
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });
  }
  constructor(private _commonService:CommonService) { }
  getUser(){
    return new Promise((resolve, reject) => {
      this._commonService.getUser().then((result: any) => {
        console.log("result", result);
        this.users = result.data;   
        resolve('');
      })
    }); 
  }
}
