import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManageComponent } from './product-manage/product-manage.component';
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
import { MatSlideToggleModule } from '@angular/material';
import { ProductDetailComponent } from './product-manage/product-detail/product-detail.component';
import { ProductManageService } from './product-manage/product-manage.service';
import { ProductDetailService } from './product-manage/product-detail/product-detail.service';
const routes:Routes=[
  {path:'',component:ProductManageComponent,
    resolve:{
      data:ProductManageService
    }
},
  {path:'detail',component:ProductDetailComponent,
  resolve:{
    data:ProductDetailService
  }
},
]

@NgModule({
  declarations: [ProductManageComponent,ProductDetailComponent],
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
    MatSlideToggleModule
  ]
})
export class ProductManageModule { }
