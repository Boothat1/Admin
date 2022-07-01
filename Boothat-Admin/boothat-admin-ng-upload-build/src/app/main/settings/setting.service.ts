import { Injectable } from '@angular/core';
import { CommonService } from '@fuse/services/common.service';
import { ApiEndPointUrl } from '@fuse/utils/systemEnums'
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SettingService implements Resolve<any>{
  setting: any
  allCountries
  allCurrencies
  constructor(
    private _commonService: CommonService,
    private _httpClient: HttpClient,
    private _fuesProgressBarService: FuseProgressBarService,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
       
      ]).then(
        () => {
          // console.log('++', this.setting)
          resolve('');
        },
        reject
      );
    });
  }

  // updatePoints(payload){
  //   this._commonService.updateAppPoints(payload).then((result:any)=>{
  //     if(result.status == 200)
  //       return result
  //   })
  // }


}
