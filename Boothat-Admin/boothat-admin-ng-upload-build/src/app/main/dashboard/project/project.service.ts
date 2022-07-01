import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiEndPointUrl, MyHeaders, ReqHeader } from '../../../../@fuse/utils/systemEnums';
import { CommonService } from '@fuse/services/common.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ProjectDashboardService implements Resolve<any>
{
    dashboard: any;
    distributorsList: any = []
    eventList: any = []
    eventMapData: any[] = []
    ticketMapData: any[] = []
    eventFilter = 1
    ticketFilter = 1
    dashboardCount: any = {}
    salesReport: any = []
    dashboardStat: any;
    recentSellers: any;
    productCategory: any;
    comparisionChartData: any;
    revenueChartData: any;
    constructor(
        private _httpClient: HttpClient,
        private _commonService: CommonService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _matSnackBar: MatSnackBar
    ) {


    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getDashboard(),
                this.getRecentSellers(),
                this.getProductCategory(),
                // this.productComparisonChart(),
                // this.pieChart()
            ]).then(
                () => {
                    resolve(this.dashboard);
                },
                (reject) => { console.log('reject') }
            );
        });
    }

    getDashboard() {
       return this._commonService.getDashboard().then((result:any)=>{
            console.log(result.data);
            this.dashboardStat = result.data;
          
                
        })
    }
    getRecentSellers(){
        return this._commonService.getMerchants(1).then((result:any)=>{
            console.log(result.data.users);
            if(result.status ==200)
            this.recentSellers = result.data.users
        })
    }
    getProductCategory(){
        return this._commonService.getProductCategory().then((result:any)=>{
          console.log(result);
          if(result.status == 200)
          this.productCategory = result.data.category
        })
      }
    //   productComparisonChart(){
    //      return this._commonService.productComparisonChart().then((result:any)=>{
    //         if(result.status == 200)
    //             this.comparisionChartData = result.data;
    //       })
    //   }
    //   pieChart(){
    //     return this._commonService.pieChart().then((result:any)=>{
    //         if(result.status == 200)
    //             this.revenueChartData = result.data;
    //       })  
    //   }
    // getDashboard() {
    //     return new Promise((resolve, reject) => {
    //         const headers = MyHeaders.getMyHeaders().reqHeadersJSON
    //         // console.log("reutrning new promise","token =>", headers.headers.get("userToken"));

    //         // setTimeout(() => {
    //         //     this.dashboard = console.log("after 5 seconds return response");
    //         //     resolve(this.dashboard)
    //         // }, 5000);


    //         this._httpClient.post(ApiEndPointUrl + 'admin/home', {}, headers).subscribe((result: any) => {
    //             if (result.status == 200) {
    //                 this.dashboard = result.data
    //                 resolve(result.data)
    //             }
    //         }, (reject: any) => { console.log('reject'); reject('reject') })
    //     })
    // }
}
