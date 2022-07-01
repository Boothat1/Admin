import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApiEndPointUrl, MyHeaders } from '@fuse/utils/systemEnums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService  implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve,reject)=>{
      Promise.all([
        
      ]).then(
        () => {
         
          resolve('');

        }).catch(() => {

          reject('');
          
        });
    })
  }
  constructor(private _httpClient:HttpClient) { }


  resetPassUser(pass,id){
    return new Promise((resolve,reject)=>{
        this._httpClient.post(ApiEndPointUrl+ '/admin/user-reset-password',{password:pass,id:id},MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result:any)=>{
          if(result.status)
          resolve(result)
        })
      })
  }
  resetPassMerchant(pass,id){
    return new Promise((resolve,reject)=>{
        this._httpClient.post(ApiEndPointUrl+ '/admin/merchant-reset-password',{password:pass,id:id},MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result:any)=>{
          if(result.status)
          resolve(result)
        })
      })
  }
}
