import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoteService implements Resolve<any>{
  tableData: any;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
      this.getAllExclusiveBooth()
      ]).then(
        () => {

          resolve('');

        }).catch(() => {

          reject('');

        });
    })
  }
  constructor(private _commonService :CommonService) { }

  getAllExclusiveBooth(){
   return this._commonService.getAllExclusiveBooth().then((result:any)=>{
      console.log(result);
      if(result.status == 200){
        this.tableData = result.data;
      }
      
    })
  }
}
