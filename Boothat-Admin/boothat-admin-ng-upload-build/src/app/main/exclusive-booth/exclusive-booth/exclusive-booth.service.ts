import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExclusiveBoothService implements Resolve<any>{
  tableData: any;

  constructor(private _commonService: CommonService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getAllBooth()
      ]).then(
        () => {
          resolve('');
        },
        (reject) => { console.log('reject') }
      );
    });
  }

  getAllBooth(){
    return this._commonService.getAllBooth().then((result:any)=>{
      console.log(result);
      if(result.status ==200){
        this.tableData = result.data;
      }
    })
  }
}
