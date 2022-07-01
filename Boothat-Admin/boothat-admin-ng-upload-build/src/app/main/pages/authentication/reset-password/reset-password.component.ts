import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ResetPasswordService } from './reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ResetPasswordComponent implements OnInit {
    pasStatus: boolean = true;
    resetPasswordForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    tempToken: any;
    isPasswordReset: boolean = false; 
    resetPassType: any;
    pass: any;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _resetPasswordService: ResetPasswordService,
        private route: ActivatedRoute,
        private snackbar:MatSnackBar,
        private router:Router
    ) {
        console.log(this.route);

        this.route.params.subscribe(params => {
            this.tempToken = params.id;
            this.resetPassType = params.type;
            console.log(params);           
        })
        // Configure the layout
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

        // Set the private defaults
        // this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.resetPasswordForm = this._formBuilder.group({
            newPassword: ['', Validators.required],
            confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
            resetToken: this.tempToken
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        // this.resetPasswordForm.get('password').valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(() => {
        //         this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
        //     });
    }
    validatePassword() {
        this.pasStatus = (this.resetPasswordForm.get('confirmPassword').value == this.resetPasswordForm.get('newPassword').value) || this.resetPasswordForm.get('confirmPassword').value == '' || this.resetPasswordForm.get('newPassword').value == '';
    }
    submit() {
        console.log(this.resetPasswordForm.value);
        // debugger
        this.pass = this.resetPasswordForm.get('newPassword').value
        
        if(this.resetPassType ==1){
            // buyer
                this._resetPasswordService.resetPassUser(this.pass,this.tempToken).then((result:any)=>{
                    this.snackbar.open(result.message,'okay',{duration:2000})
                    if(result.status == 200){
                        this.isPasswordReset = true;           
                       
                    }  
                })
        }else{
            //seller
            this._resetPasswordService.resetPassMerchant(this.pass,this.tempToken).then((result:any)=>{
                this.snackbar.open(result.message,'okay',{duration:2000})
                if(result.status == 200){
                    this.isPasswordReset = true;                    
                }  
            })

        }
        // this._resetPasswordService.resetPass(this.resetPasswordForm.value).then((result: any) => {
        //     console.log(result);
        //     this.snackbar.open(result.message,'okay',{duration:2000})
        //     if(result.status == 200){
        //         this.isPasswordReset = true;           
        //         // this.router.navigate(['/reset/reset-password/reset-successfully'])
        //     }else{
              
        //         // this.router.navigate(['/reset/reset-password/' + this.tempToken])
        //     }       
        // })
    }

    /**
     * On destroy
     */
    // ngOnDestroy(): void {
    //     // Unsubscribe from all subscriptions
    //     this._unsubscribeAll.next();
    //     this._unsubscribeAll.complete();
    // }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
