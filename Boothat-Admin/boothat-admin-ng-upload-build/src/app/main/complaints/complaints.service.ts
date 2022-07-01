import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService implements Resolve<any>{
  tableData: any;

  constructor(private commonService : CommonService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {

      Promise.all([
      //  this.getUser()
      this.getAllComplaintList()
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });

    
  }
  getAllComplaintList(){
   return this.commonService.getAllComplaintList().then((result:any)=>{
      if(result.status == 200){
        this.tableData =  result.data
      }
    })
  }
}
