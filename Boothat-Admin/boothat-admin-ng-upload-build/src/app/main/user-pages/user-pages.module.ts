import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPagesComponent } from './user-pages/user-pages.component';
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
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'',component:UserPagesComponent}
]



@NgModule({
  declarations: [UserPagesComponent],
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
    MatInputModule,
    QuillModule.forRoot(),
    FormsModule
  ]
})
export class UserPagesModule { }
