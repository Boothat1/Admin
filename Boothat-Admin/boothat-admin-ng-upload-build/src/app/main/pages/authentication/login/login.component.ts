import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    showError: boolean = false;
    errorMessage: string = '';


    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService,
        private _cookieService: CookieService,
        private injector: Injector


    ) {
        if (localStorage.getItem('userLoggedIn') == 'true') {
            this._router.navigate(['/dashboard'])
        }

        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // To reset states
        // localStorage.clear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    /**
   * login user
   * 
   * 
   *  */

    userLogin(): void {
        this.showError = false;
        const cred = this.loginForm.getRawValue();
        this.loginForm.markAsPending();
        this._authService.userLogin(cred)
            .then((data) => {

                //TODO: AuthGaurd and LocalStorage Stuff 
                console.log("User Data ===>", data);

                if (data.status!=200) {

                    this.showError = true;
                    this.errorMessage = data.hasOwnProperty('message') ? data.message : 'Wrong Email or Password';
                    this.loginForm.reset();

                }
                else{
                    console.log(data)
                    console.log("data.data", data.data)
                    localStorage.setItem('userToken', data.data.token);
                    localStorage.setItem('userLoggedIn', 'true');
                    localStorage.setItem('userEmail', data.data.user.email);
                    localStorage.setItem('userName', data.data.user.name);
                    localStorage.setItem('id', data.data.user.id);
                    localStorage.setItem('adminSupportNumber', data.data.user.whatsAppNumber);
                    // localStorage.setItem('points',data.data.user.points)
                    // localStorage.setItem('rupees',data.data.user.rupees)
                    console.log(" before navigating to dashboard token =>", localStorage.getItem("userToken"));
                   
                    this._router.navigate(['/dashboard']);
                    
                    // Check if it is a staff member
                    console.log("after navigating to dashboard");

                }


            }).catch((err) => {
                console.log(err);
                this.showError = true;
                this.errorMessage = 'Failed to connect';
            });

    }
}
