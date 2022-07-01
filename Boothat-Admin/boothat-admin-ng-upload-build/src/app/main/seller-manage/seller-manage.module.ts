import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerManageComponent } from './seller-manage/seller-manage.component';
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
import { DetailComponent } from './seller-manage/detail/detail.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DetailOverviewComponent } from './seller-manage/detail/detail-overview/detail-overview.component';
import { SellerManageService } from './seller-manage.service';
import { SellerDetailService } from './seller-manage/detail/seller-detail.service';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import { SellerOrdersComponent } from './seller-manage/detail/seller-orders/seller-orders.component';
import { SellerProductsComponent } from './seller-manage/detail/seller-products/seller-products.component';



const routes:Routes=[
  {path:'',component:SellerManageComponent,
  resolve: {
    data: SellerManageService
  }
},
  {path:'detail',component:DetailComponent,
  resolve: {
    data: SellerDetailService
  } 
},
  {path:'detail-overview',component:DetailOverviewComponent,
  resolve: {
    data: SellerDetailService
  }
},
  // {path:'product-detail',component:ProductDetailComponent},
]

@NgModule({
  declarations: [SellerManageComponent, DetailComponent, DetailOverviewComponent, SellerOrdersComponent, SellerProductsComponent],
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
    MatSlideToggleModule,
    // FusePipesModule,
    MatRadioModule,
    MatTabsModule
  ]
})
export class SellerManageModule { }
