import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { MatDialog } from '@angular/material';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { ApiEndPointUrl } from '../../../../@fuse/utils/systemEnums';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router"
import { ChangeProfileDialogComponent } from './change-profile-dialog/change-profile-dialog.component';
import { AddSupportDialogComponent } from './add-support-dialog/add-support-dialog.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';


@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
    
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    userName: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    email: string
    @ViewChild('searchText', { static: true })
    searchText: ElementRef;
    searchInput:any = '';
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _translateService: TranslateService,
        public _dialog: MatDialog,
        private _httpClient: HttpClient,
        private _matSnackBar: MatSnackBar,
        private _router: Router,
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];



        this.navigation = navigation;
        this.userName = localStorage.getItem('userName');
        this.email = localStorage.getItem('userEmail');
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
    }
    clearSearch() {
        this.searchText.nativeElement.value = "";
        this.searchText.nativeElement.focus()
        // this.filterData('')
      }
    logout() {
        localStorage.clear()
        this._router.navigate(['/auth/login']);
    }
    // openChangePassDialog() {
    //     const changePassDialog = this._dialog.open(ChangePasswordDialogComponent, { width: '400px' });
    //     changePassDialog.afterClosed().subscribe(data => {
    //         console.log(data[1]);
    //         var header = new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'Authorization': localStorage.getItem('userToken')
    //         });
    //         if (data[1]) {
    //             var body = {
    //                 'oldPassword': data[1].oldPass,
    //                 'newPassword': data[1].newPass,
    //             }
              
    //             this._httpClient.put(ApiEndPointUrl + 'admin/change-password', body, { headers: header })
    //                 .subscribe((response: any) => {
    //                     this._matSnackBar.open(response.message, 'OK', {
    //                         verticalPosition: 'bottom',
    //                         duration: 2000
    //                     });

    //                 }, error => {
    //                     this._matSnackBar.open(error.message, 'error', {
    //                         verticalPosition: 'bottom',
    //                         duration: 2000
    //                     });
    //                 }

    //                 );
    //         }
    //     })
    // }

    // openChangeProfileDialog() {
    //     const changeProfileDialog = this._dialog.open(ChangeProfileDialogComponent, { width: '400px' });
    //     changeProfileDialog.afterClosed().subscribe(data => {
    //         console.log(data[1]);
    //         var header = new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'Authorization': localStorage.getItem('userToken')
    //         });
    //         if (data[1]) {
    //             var body = {
    //                 "name": data[1].newName
    //             }
    //             this._httpClient.put(ApiEndPointUrl + 'admin/edit-profile', body, { headers: header })
    //                 .subscribe((response: any) => {
    //                     this._matSnackBar.open(response.message, 'OK', {
    //                         verticalPosition: 'bottom',
    //                         duration: 2000
    //                     });
    //                     localStorage.setItem('userName', response.data.name)
    //                     this.userName = localStorage.getItem('userName');
    //                 }, error => {
    //                     this._matSnackBar.open(error.message, 'error', {
    //                         verticalPosition: 'bottom',
    //                         duration: 2000
    //                     });
    //                 }

    //                 );
    //         }
    //     })
    // }

    openSupportDialog() {
        const changeProfileDialog = this._dialog.open(AddSupportDialogComponent, { width: '400px' });
        changeProfileDialog.afterClosed().subscribe(data => {
            console.log(data[1]);
            var header = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('userToken')
            });
            if (data[1]) {
                var body = {
                    "whatsAppNumber": data[1].whatsAppNumber
                }
                this._fuseProgressBarService.show()
                this._httpClient.post(ApiEndPointUrl + 'admin/change-whatsAppNumber', body, { headers: header })
                    .subscribe((response: any) => {
                        this._matSnackBar.open(response.message, 'OK', {
                            verticalPosition: 'bottom',
                            duration: 2000
                        });
                        if(response.status === 200) {
                            localStorage.setItem('adminSupportNumber', data[1].whatsAppNumber)
                            this._fuseProgressBarService.hide()
                        }
                    }, error => {
                        this._matSnackBar.open(error.message, 'error', {
                            verticalPosition: 'bottom',
                            duration: 2000
                        });
                        this._fuseProgressBarService.hide()
                    }
                    
                    );
                    // this._fuseProgressBarService.hide()
            }
        })
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }
    
}
