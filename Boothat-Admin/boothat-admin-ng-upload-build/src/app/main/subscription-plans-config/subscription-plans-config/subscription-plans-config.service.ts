import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlansConfigService  implements Resolve<any>{
  tableData: any = [];

  constructor(private commonService:CommonService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getPromotePlanPackage()
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });
  }
  

  getPromotePlanPackage(){
    return this.commonService.getPromotePlanPackage(0).then((result:any)=>{
      console.log(result);
      if(result.status == 200){
        this.tableData = result.data.PromotePlanPackage
        console.log("this.tableData",this.tableData);
        
      }
      
    })
  }
}
