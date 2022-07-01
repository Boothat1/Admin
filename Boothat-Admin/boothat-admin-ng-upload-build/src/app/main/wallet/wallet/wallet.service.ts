import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService  implements Resolve<any>{
  tableData: any;

  constructor(private commonService:CommonService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getAllTransactionList()
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });
  }

  getAllTransactionList(){
      return this.commonService.getAllTransactionList().then((result:any)=>{
        if(result.status == 200){
          console.log("wallet data",result);
          
          this.tableData  = result.data;

        }
      })
  }
  
}
