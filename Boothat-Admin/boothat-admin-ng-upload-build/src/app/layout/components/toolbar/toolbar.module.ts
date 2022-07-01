import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ChangeProfileDialogComponent } from './change-profile-dialog/change-profile-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import { AddSupportDialogComponent } from './add-support-dialog/add-support-dialog.component';
@NgModule({
    declarations: [
        ToolbarComponent,
        ChangePasswordDialogComponent,
        ChangeProfileDialogComponent,
        AddSupportDialogComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        MatDialogModule,
        MatInputModule,
        MatSnackBarModule,
        MatBadgeModule
    ],
    exports     : [
        ToolbarComponent
    ],
    entryComponents:[ChangePasswordDialogComponent,ChangeProfileDialogComponent,AddSupportDialogComponent]
})
export class ToolbarModule
{
}
