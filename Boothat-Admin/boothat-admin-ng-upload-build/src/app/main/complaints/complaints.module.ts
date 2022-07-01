import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsComponent } from './complaints/complaints.component';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintsService } from './complaints.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { DetailComponent } from './complaints/detail/detail.component';

const routes: Routes = [
  {
    path: '', component: ComplaintsComponent,
    resolve: {
      data: ComplaintsService
    }
  },
  { path: 'detail', component: DetailComponent}
]

@NgModule({
  declarations: [ComplaintsComponent, DetailComponent],
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
  ]
})
export class ComplaintsModule { }
