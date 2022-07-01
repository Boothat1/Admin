import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { ApiEndPointUrl } from '../../../@fuse/utils/systemEnums';
import { MatSnackBar } from '@angular/material';
import { CommonService } from '@fuse/services/common.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    reqHeaderLogin = new HttpHeaders({ 'Content-Type': 'application/json' });
    isUserLogin: boolean = false;
    routeParams: any;
    onTokenChanged: Subject<any>;


    constructor(
        private _httpClient: HttpClient,
        private _matSnackBar: MatSnackBar,
        private _commonService: CommonService
    ) {

        // set Defaults

        this.onTokenChanged = new Subject();

    }



    /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.checktoken()
            ]).then(
                () => {
                    resolve('');
                },
                (error) => {
                    console.log('Error in navigation :', error);
                    alert('Sorry!! Cannot navigate to Page Expired !! ');
                    reject();
                }
            );
        });
    }



    /**
     * Login user
     *
     * @param cred 
     * @returns {Promise<any>}
     */
    userLogin(cred): Promise<any> {
        //  cred.password = CryptoJS.AES.encrypt(cred.password.trim(), environment.client_secret.trim()).toString();

        return new Promise((resolve, reject) => {
            this._httpClient.post(ApiEndPointUrl + 'admin/login', cred, { headers: this.reqHeaderLogin })
                .subscribe((response: any) => {

                    this.isUserLogin = true;

                    resolve(response);
                }, reject);
        });
    }





    /**
     * Forgot Password user
     *
     * @param cred 
     * @returns {Promise<any>}
     */
    forgotPassword(cred): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiURL + 'api/v2/forgotpassword', cred, { headers: this.reqHeaderLogin })
                .subscribe((response: any) => {

                    resolve(response);
                }, reject);
        });
    }




    /**
  * Checks if user have valid token for accessing Reset Password Page
  *
  * 
  * @returns {Promise<any>}
  */
    checktoken(): Promise<any> {


        // var url = this.routeParams;

        // console.log('token in Params :', this.routeParams);

        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.apiURL + 'api/v2/resetpasswordlink/check/' + this.routeParams.token, { headers: this.reqHeaderLogin })
                .subscribe((res: any) => {
                    // console.log('Reset Response :', res);
                    if (res.response == 1) {

                        resolve(res);
                    }
                    else {
                        reject('Link Expired');
                    }

                }, reject);
        });
    }




    resetPasswordViaLink(tokenPacket): Promise<any> {

        var toSend = {

            "id": this.routeParams.token,
            "password": tokenPacket

        }

        // console.log('this.tokenPacket :', tokenPacket);
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiURL + 'api/v2/resetpassword', toSend, { headers: this.reqHeaderLogin })
                .subscribe((response: any) => {

                    resolve(response);
                });

        });


    }



    /**
        * Create user
        *
        * @param userDetails 
        * @returns {Promise<any>}
        */
    userRegister(userDetails): Promise<any> {
        let reqHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiURL + 'api/v2/account/signup', userDetails, { headers: reqHeaders })
                .subscribe((response: any) => {

                    this.isUserLogin = true;

                    resolve(response);
                }, reject);
        });
    }

    /**
        * Verify otp
        *
        * @param otp 
        * @returns {Promise<any>}
        */
    verifyOtp(otp): Promise<any> {
        let reqHeaders = new HttpHeaders({
            'x-access-token': localStorage.getItem('userToken'),
            'Content-Type': 'application/json'
        });

        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiURL + 'api/v2/account/verify-email', otp, { headers: reqHeaders })
                .subscribe((response: any) => {

                    resolve(response);
                }, reject);
        });
    }

    // manage permissions for diff roles




}
