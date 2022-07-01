import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { ConfirmationDialogComponent } from './Dialog/confirmation-dialog/confirmation-dialog.component';
import { CropperComponent } from './Dialog/cropper/cropper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatSliderModule } from '@angular/material/slider';
import { AgmCoreModule } from '@agm/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AddEventTypeDialogComponent } from './Dialog/add-event-type-dialog/add-event-type-dialog.component';
import { AddOrganiserDialogComponent } from './Dialog/add-organiser-dialog/add-organiser-dialog.component';
import { AddTicketTypeDialogComponent } from './Dialog/add-ticket-type-dialog/add-ticket-type-dialog.component';
import { AddGuestDialogComponent } from './Dialog/add-guest-dialog/add-guest-dialog.component';
import { AddEventCategoryDialogComponent } from './Dialog/add-event-category-dialog/add-event-category-dialog.component';
import { AssignEventDialogComponent } from './Dialog/assign-event-dialog/assign-event-dialog.component';
import { SellerDailogComponent } from './Dialog/seller-dailog/seller-dailog.component';
import { ModeratorRequestDailogComponent } from './Dialog/moderator-request-dailog/moderator-request-dailog.component';
import { GroupDailogComponent } from './Dialog/group-dailog/group-dailog.component';
import { UsersListDailogComponent } from './Dialog/users-list-dailog/users-list-dailog.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertsDailogComponent } from './Dialog/alerts-dailog/alerts-dailog.component';
import { AddPlantDailogComponent } from './Dialog/add-plant-dailog/add-plant-dailog.component';
import { DeleteDailogComponent } from './Dialog/delete-dailog/delete-dailog.component';
import { AcceptDailogComponent } from './Dialog/accept-dailog/accept-dailog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CurrenyPlansDialogComponent } from './Dialog/curreny-plans-dialog/curreny-plans-dialog.component';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FlexLayoutModule,
        MatDialogModule,
        FuseDirectivesModule,
        FusePipesModule,
        ImageCropperModule,
        MatSliderModule,
        AgmCoreModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        MatCardModule,
        NgxPaginationModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSelectModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule,
        SellerDailogComponent,
        ModeratorRequestDailogComponent,
        GroupDailogComponent,
        UsersListDailogComponent,
        AlertsDailogComponent,
        AddPlantDailogComponent,
        MatTableModule,
        MatCardModule,
        NgxPaginationModule,
        DeleteDailogComponent,
        AcceptDailogComponent,
        CurrenyPlansDialogComponent,
        AddOrganiserDialogComponent,
        MatProgressSpinnerModule,
        MatSelectModule
        
    ],
    declarations: [ConfirmationDialogComponent, CropperComponent,AddEventTypeDialogComponent,AddOrganiserDialogComponent,AddTicketTypeDialogComponent,AddGuestDialogComponent,AddEventCategoryDialogComponent,AssignEventDialogComponent,SellerDailogComponent,ModeratorRequestDailogComponent,GroupDailogComponent,UsersListDailogComponent,AlertsDailogComponent,AddPlantDailogComponent,DeleteDailogComponent,AcceptDailogComponent,
        CurrenyPlansDialogComponent],
    entryComponents: [ConfirmationDialogComponent, CropperComponent,AddEventTypeDialogComponent,AddOrganiserDialogComponent,AddTicketTypeDialogComponent,AddGuestDialogComponent,AddEventCategoryDialogComponent,AssignEventDialogComponent,SellerDailogComponent,ModeratorRequestDailogComponent,GroupDailogComponent,UsersListDailogComponent,AlertsDailogComponent,AddPlantDailogComponent,DeleteDailogComponent,AcceptDailogComponent,AddOrganiserDialogComponent,CurrenyPlansDialogComponent]
})
export class FuseSharedModule {
}
