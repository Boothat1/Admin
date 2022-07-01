import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
    selector     : 'register',
    templateUrl  : './register.component.html',
    styleUrls    : ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy
{
    registerForm: FormGroup;

    showError: boolean = false;
    errorMessage:string = '';

    // Private
    private _unsubscribeAll: Subject<any>;


    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {Router} _router,
     * @param {AuthService} _authService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService,
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.registerForm = this.createRegisterForm();

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Creates register form
     * @returns FormGroup
     */
    createRegisterForm(): FormGroup
    {
        let regexEmail = '';
        let regexPhone = '^[\+]?[(]?[1-9]{1}[)]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$';


        return this._formBuilder.group({
            firstName           : ['', Validators.required],
            lastName           : ['', Validators.required],
            phoneCode           : [{value : "+1", disabled: true}, Validators.required],
            phoneNumber           : ['', [Validators.required, Validators.pattern(regexPhone)]],
            email          : ['', [Validators.required]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });
    }


    /**
     * 
     */
    createAccount()
    {
        this.showError = false;

        let { firstName, lastName,phoneCode,phoneNumber,email,password } = this.registerForm.getRawValue();

       this.registerForm.markAsPending();

        let toSend = {
            "firstName" : firstName, 
            "lastName" : lastName,
            "phoneCode" : phoneCode,
            "phoneNumber" : phoneNumber,
            "email" : email + '@mailinator.com',
            "password" : password
        }

            this._authService.userRegister(toSend)
                       .then((resolved) => {
                       console.log("OUTPUT: resolved", resolved)
           
                           if (typeof (resolved) != 'undefined' && resolved.response == '0') //api returned error
                           { 
                            this.showError = true;
                            this.errorMessage =   resolved.data.hasOwnProperty('message') ?  resolved.data.message : 'Fail to create a new user';
         
                            // this.registerForm.reset();
                           }
                           else{
                               console.log("OUTPUT: reached")
                                // msg = 'success'
                                // localStorage.setItem('userToken', resolved.data.token)
                                // this._router.navigate(['/auth/verify-email']);
                                
                           }

                       }).catch(err => {
                       console.log("OUTPUT: err", err)
                           
                       })

    }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {passwordsNotMatching: true};
};
