import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { CommonService } from "@fuse/services/common.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrderDetailService implements Resolve<any> {
  tableData: any;
  productObj: any = new BehaviorSubject(null);
  constructor(private _commonService: CommonService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        // this.getAllOrderList()
      ]).then(
        () => {
          resolve("");
        },
        (reject) => {
          console.log("reject");
        }
      );
    });



  }
  // getOrdersProductDetail(){

  // }
}
