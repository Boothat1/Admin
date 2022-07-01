import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannersService implements Resolve<any>{
  tableData: any;

  constructor(private _commonService: CommonService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {

      Promise.all([
      //  this.getBanners()
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });
  }
  // getBanners(){
  //  return this._commonService.getBanners().then((result: any) => {
  //     console.log(result);
  //     if (result.status == 200) {
  //         this.tableData = result.data
  //     }
  //   })
  // }
 
}
