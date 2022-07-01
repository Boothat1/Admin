import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { ProjectDashboardComponent } from '../project/project.component';
import { ProjectDashboardService } from '../project/project.service';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { DistributorListDialogComponent } from './distributor-list-dialog/distributor-list-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';



const routes: Routes = [
    {
        path: '**',
        component: ProjectDashboardComponent,
        resolve: {
            data: ProjectDashboardService
        }
    }
];

@NgModule({
    declarations: [
        ProjectDashboardComponent,
        DistributorListDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        NgApexchartsModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatCardModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatDialogModule,
       
    ],
    providers: [
        ProjectDashboardService,
    ],
    entryComponents: [DistributorListDialogComponent]
})
export class ProjectDashboardModule {
}

