import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService implements Resolve<any>{
  tableData: any;
  constructor(private _commonService: CommonService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getAllOrderList()
      ]).then(
        () => {
          resolve('');
        },
        (reject) => { console.log('reject') }
      );
    });
  }

  getAllOrderList(){
    return this._commonService.getAllOrderList().then((result:any)=>{
      if(result.status == 200){
        this.tableData = result.data
      }
    })
  }  
  
}
