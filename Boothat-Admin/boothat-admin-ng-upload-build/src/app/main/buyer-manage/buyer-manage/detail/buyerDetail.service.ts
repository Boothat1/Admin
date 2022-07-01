import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { BuyerManageModule } from '../../buyer-manage.module';
import { DetailComponent } from './detail.component';

@Injectable({
  providedIn: 'root'
})
export class BuyerDetailService implements Resolve<any>{
  singleUser: any;
  paramsId: any;
  idForDetailPage = new Subject();
  paramSubscriber: Subscription;
 
  
  constructor(private commonService:CommonService,
    private activatedRoute: ActivatedRoute,
    ) { 
    
      // this.paramSubscriber = this.activatedRoute.queryParams.subscribe((result:any)=>{
      //   console.log(result);
      //   this.paramsId = result.id
      //   if(this.paramsId){
      //     this.getSingleUser(this.paramsId)
      //     // this.getSingleMerchant(this.paramsId)
      //   }
      // })
      
      //  console.log("ParamSubscriber constructor",this.paramSubscriber);
       
   }
  ngOnInit(): void {
     
  }

  
  ngOnDestroy(): void {
    // this.paramSubscriber.unsubscribe();
    // console.log("Seller Detail Service Destroyed");
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {

      Promise.all([
       
      ]).then(
        () => {

          resolve('');
        }).catch(() => {

          reject('');

        });
    });
  }
  async getSingleUser(id) {
  await  this.commonService.getSingleUser(id).then((result: any) => {
      if (result.status == 200) {
        console.log(result);      
        this.singleUser = result.data;
        console.log("hello there",this.singleUser);
        
      }
    })
  }
}
