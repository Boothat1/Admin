import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService  implements Resolve<any>{
  tableData: any;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
          this.getNotification()
      ]).then(
        () => {

          resolve('');

        }).catch(() => {

          reject('');

        });
    })
  }

  constructor(private commonService:CommonService) { }
  getNotification(){
    return this.commonService.getNotifications().then((result:any)=>{
      console.log(result.data);
      if(result.status ==200)
        this.tableData = result.data;
    })
  }
}
