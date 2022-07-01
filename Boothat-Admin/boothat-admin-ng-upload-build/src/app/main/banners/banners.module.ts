import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners/banners.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { BannersService } from './banners/banners.service';
import { DetailComponent } from './banners/detail/detail.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatDatepickerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '', component: BannersComponent,
    resolve: {
      data: BannersService
    }
  },
  {
    path: 'detail', component:DetailComponent ,
    // resolve: {
    //   data: ConsumerDetailService
    // }
  }
]

@NgModule({
  declarations: [ DetailComponent,BannersComponent],
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
    NgxFileDropModule,
    MatDatepickerModule,
  ]
})
export class BannersModule { }
