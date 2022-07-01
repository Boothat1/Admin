import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService  implements Resolve<any>{
  promos: any;
  tableData: any;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
       this.getPromos()
      ]).then(
        () => {

          resolve('');

        }).catch(() => {

          reject('');

        });
    })
  }
  constructor(public _commonService: CommonService) { }
  getPromos() {
    return this._commonService.getPromoCodes().then((result: any) => {
      console.log('promos', result.data);
      this.tableData = result.data;
    })
  }
}
