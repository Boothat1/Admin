import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';

import { RegisterModule } from 'app/main/pages/authentication/register/register.module';

import { ForgotPasswordModule } from 'app/main/pages/authentication/forgot-password/forgot-password.module';

import { ResetPasswordModule } from 'app/main/pages/authentication/reset-password/reset-password.module';

import { LockModule } from 'app/main/pages/authentication/lock/lock.module';
import { MailConfirmModule } from 'app/main/pages/authentication/mail-confirm/mail-confirm.module';

import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';


import { ProfileModule } from 'app/main/pages/profile/profile.module';

import { LoginComponent } from './authentication/login/login.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { LockComponent } from './authentication/lock/lock.component';
import { AuthService } from './auth.service';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, MatSnackBarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { RegisterComponent } from './authentication/register/register.component';
import { VerifyOtpModule } from './authentication/verify-otp/verify-otp.module';
import { VerifyOtpComponent } from './authentication/verify-otp/verify-otp.component';
import { VerifyService } from './verify.service';
import { ResetPasswordService } from './authentication/reset-password/reset-password.service';




const authRoutes: Routes = [
   
   
    {path: 'login',component: LoginComponent},
    {path: 'forgot-password',component: ForgotPasswordComponent},
    // {path: 'register',component: RegisterComponent},
    // {path: 'verify-email',component: VerifyOtpComponent },
    {path: 'reset-password/:id/:type',component: ResetPasswordComponent ,
    resolve:{
        data: ResetPasswordService
    },
    
},
// {path: 'reset-password/reset-successfully',component: ResetPasswordComponent },
    // {path: 'lock',component: LockComponent},
    // {
    //     path     : 'reset-password/check/:token',
    //     component: ResetPasswordComponent,
    //     resolve  : {
    //         data: AuthService
    //     }
    // },

    // {path: 'lock',component: LockComponent},
    // {
    //     path     : 'verify-email/:token',
    //     component: VerifyOtpComponent,
    //     resolve  : {
    //         data: VerifyService
    //     }
    // },
    {path: '',redirectTo: 'login'},    
   
];


@NgModule({
    declarations: [
            LoginComponent,
            ForgotPasswordComponent,
            ResetPasswordComponent,
            LockComponent,
            RegisterComponent,
            VerifyOtpComponent,
        ],

    imports: [
        // Authentication
        LoginModule,

        RegisterModule,

        ForgotPasswordModule,

        ResetPasswordModule,

        LockModule,
        MailConfirmModule,
        VerifyOtpModule,


        // Errors
        Error404Module,
        Error500Module,


        // Profile
        ProfileModule,

         // Routing module
         RouterModule.forChild(authRoutes),
         MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        MatToolbarModule,
        FuseSharedModule,
        MatSnackBarModule


    ]
})
export class PagesModule{}
