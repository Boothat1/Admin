import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { CommonService } from './common.service';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private _commonService: CommonService,
    private _router: Router,
    private _fuseProgressbarService: FuseProgressBarService
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("appHttpInterceptor","intercept","requestheader",req.headers.get("userToken"))
    return next.handle(req).pipe(
      tap(evt => {
        // console.log("appHttpInterceptor","tap")
        if (evt instanceof HttpResponse) {
          // console.log("appHttpInterceptor","event status", evt.status, "body status",evt.body.status)
          // if(evt.body && evt.body.success)
          // console.log('**', evt)
          if (evt.status != 200 || evt.body.status != 200) {
            this._fuseProgressbarService.hide()
          }
          if (evt.status == 401 || evt.body.status == 401) {
            localStorage.setItem("userLoggedIn", "false")
            localStorage.removeItem("userToken")
            console.log('ck1')
            this._router.navigate['/login']
          }
        }
      }),
      catchError((err: any) => {
        console.log("appHttpInterceptor","error", "status", err)
        if (err.status != 200 || err.body.status != 200) {
          this._fuseProgressbarService.hide()
        }

        if (err instanceof HttpErrorResponse) {
          if (err.status == 401 || err.error.status == 401) {
            localStorage.setItem("userLoggedIn", "false")
            localStorage.removeItem("userToken")
            window.location.href = "/auth/login";
          }

        }
        return of(err);
      }));

  }

}