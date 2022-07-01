import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerDetailService implements Resolve<any>{
  paramsId: any;
  singleMerchant: any;
  paramSubscriber: Subscription;
  tableData:any  =  new BehaviorSubject('');
  sellerOrders:any = new BehaviorSubject('');
  constructor(private _commonService:CommonService,
              private activatedRoute: ActivatedRoute,
              private _fuseProgressbarService:FuseProgressBarService,
    ) {
      

      this.paramSubscriber = this.activatedRoute.queryParams.subscribe((result:any)=>{
        console.log(result);
        this.paramsId = result.id
        if(this.paramsId){
          this.getSingleMerchant(this.paramsId)
        }
      })

   }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.paramSubscriber.unsubscribe();
    console.log("Seller Detail Service Destroyed");
  }
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {

      Promise.all([
      //  this.getUser()
      // this.getMerchants()
      
     
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });
  }



  getSingleMerchant(id): Promise<any> { 
    console.log("seller detail api called");
    
    return this._commonService.getSingleMerchant(id).then((result:any)=>{
      console.log("data in service",result.data); 
      if(result.status == 200){
        this.singleMerchant = result.data
      }   
    })
  }

  getProductsOfMerchant(pageNumber?,tabNumber?,merchantId?,search?, timeFilter?): Promise<any> {
    this._fuseProgressbarService.show()
   return this._commonService.getProducts(pageNumber,tabNumber,merchantId,search, timeFilter).then((result:any)=>{
      if(result.status == 200){
        this.tableData.next(result.data)
        this._fuseProgressbarService.hide()
      }   
      this._fuseProgressbarService.hide()
    })
  }

  sellerAllOrders(id,pageNumber?){
    this._commonService.getAllOrderListMerchant(id,pageNumber).then((result:any)=>{
      if(result.status == 200){
        this.sellerOrders.next(result.data);
      }
    })
  }
}
