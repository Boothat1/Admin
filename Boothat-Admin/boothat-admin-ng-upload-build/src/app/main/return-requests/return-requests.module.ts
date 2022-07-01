import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnRequestsComponent } from './return-requests/return-requests.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { reject } from 'lodash';
import { DetailComponent } from './return-requests/detail/detail.component';
import { ReturnRequestsService } from './return-requests/return-requests.service';

const routes:Routes=[
  {path:'',component:ReturnRequestsComponent,
  resolve:{
    data:ReturnRequestsService
  } 
},
{path:'detail',component:DetailComponent,
  
}
]


@NgModule({
  declarations: [ReturnRequestsComponent, DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    FuseSharedModule,
    NgxPaginationModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule
  ]
})
export class ReturnRequestsModule { }
