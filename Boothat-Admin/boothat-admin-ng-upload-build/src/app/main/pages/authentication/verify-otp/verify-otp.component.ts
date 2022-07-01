import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../../auth.service';
import { VerifyService } from '../../verify.service';

@Component({
    selector     : 'verify-otp',
    templateUrl  : './verify-otp.component.html',
    styleUrls    : ['./verify-otp.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class VerifyOtpComponent implements OnInit
{
    otpForm: FormGroup;
    showError: boolean = false;
    showSuccess: boolean = false;
    responseMessage: string = '';

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _verifyService: VerifyService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.showSuccess = this._verifyService.isSuccessful;
        this.responseMessage = this._verifyService.message;
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this.otpForm = this._formBuilder.group({
        //     otp: ['', [Validators.required ]]
        // });
    }

    /**
     * OTP Verification
     */
    // verifyOtp()
    // {
    //     // this.showError = false;

    //     let { otp } = this.otpForm.getRawValue();

    //     this.otpForm.markAsPending();

    //     let toSend = {
    //         "otp" : otp
    //     }

    //         this._authService.verifyOtp(toSend)
    //                    .then((resolved) => {
    //                    console.log("OUTPUT: resolved", resolved)
           
    //                        if (typeof (resolved) != 'undefined' && resolved.response == '0') //api returned error
    //                        { 
    //                            // this.errorMessage =   resolved.data.hasOwnProperty('message') ?  resolved.data.message : 'Wrong Email or Password';
                               
    //                         this.showError = true;
    //                         this.responseMessage = resolved.message;
    //                         this.otpForm.reset();
    //                        }
    //                        else{

                               
    //                            console.log("OUTPUT: reached")
    //                            this.showSuccess = true;
    //                            this.showError = false;
    //                            this.responseMessage = resolved.message;
    //                             // msg = 'success'
    //                             // localStorage.setItem('token', resolved.data.token)
    //                             // this._router.navigate(['/auth/verify-email']);
                                
    //                        }

    //                    }).catch(err => {
    //                    console.log("OUTPUT: err", err)
                           
    //                    })

    // }
}
