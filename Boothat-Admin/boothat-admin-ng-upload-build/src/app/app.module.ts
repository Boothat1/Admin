import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';

import { AuthGuardService } from './auth-guard.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from '@agm/core';
import { CookieService } from 'ngx-cookie-service';
import { AppHttpInterceptor } from '@fuse/services/interceptor.service';
import { reject } from 'lodash';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';


const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: './main/dashboard/project/project.module#ProjectDashboardModule',
        canActivate: [AuthGuardService]
        // canLoad: [AuthGuardService],
    },
    {
        path: 'auth',
        loadChildren: './main/pages/pages.module#PagesModule',
    },
    {
        path: 'reset',
        loadChildren: './main/pages/pages.module#PagesModule',
    },
    {
        path: 'buyer-manage',
        loadChildren: './main/buyer-manage/buyer-manage.module#BuyerManageModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'wallet',
        loadChildren: './main/wallet/wallet.module#WalletModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'product-manage',
        loadChildren: './main/product-manage/product-manage.module#ProductManageModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'seller-manage',
        loadChildren: './main/seller-manage/seller-manage.module#SellerManageModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'banners',
        loadChildren: './main/banners/banners.module#BannersModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'exclusive-booth',
        loadChildren: './main/exclusive-booth/exclusive-booth.module#ExclusiveBoothModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'promote',
        loadChildren: './main/promote/promote.module#PromoteModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'promo-code',
        loadChildren: './main/promo-codes/promo-codes.module#PromoCodesModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'complaints',
        loadChildren: './main/complaints/complaints.module#ComplaintsModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'orders',
        loadChildren: './main/orders/orders.module#OrdersModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'return-requests',
        loadChildren: './main/return-requests/return-requests.module#ReturnRequestsModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'subscription-plans-config',
        loadChildren: './main/subscription-plans-config/subscription-plans-config.module#SubscriptionPlansConfigModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'notifications',
        loadChildren: './main/notifications/notifications.module#NotificationsModule',
        canActivate: [AuthGuardService]
    },
    
    {
        path: 'master-settings',
        loadChildren: './main/master-settings/master-settings.module#MasterSettingsModule',
        canActivate: [AuthGuardService]
    }
    ,
    {
        path: 'pages',
        loadChildren: './main/user-pages/user-pages.module#UserPagesModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'revenue',
        loadChildren: './main/revenue/revenue.module#RevenueModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'settings',
        loadChildren: './main/settings/settings.module#SettingsModule',
        canActivate: [AuthGuardService]
    },
    // Main Routes
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'reset', redirectTo:'reset',pathMatch:'full'},
    { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'forgot-password', redirectTo: 'auth/forgot-password', pathMatch: 'full' },
    // {path: 'lock',redirectTo: 'auth/lock',pathMatch: 'full'},
    // { path: 'reset-password', redirectTo: 'auth/reset-password', pathMatch: 'full' },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        GooglePlaceModule,
        BrowserModule,
        NgxMaterialTimepickerModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        // Material moment date module
        MatMomentDateModule,
        // Material
        MatButtonModule,
        MatIconModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        // App modules
        LayoutModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDosbgI6M3Iw9abM1cQTvFpOeJI3qpfIEs',
            libraries: ['places']
        }),
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true,

        }, {
            provide: MAT_RADIO_DEFAULT_OPTIONS,
            useValue: { color: 'primary' },
        }
    ]
})

export class AppModule {
}
