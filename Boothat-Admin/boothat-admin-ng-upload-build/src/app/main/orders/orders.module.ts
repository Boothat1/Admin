import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
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
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { OrdersService } from './orders/orders.service';
import { OrderDetailService } from './orders/order-detail/order-detail.service';
import { ProductDetailComponent } from './orders/product-detail/product-detail.component';
const routes:Routes=[
  {path:'',component:OrdersComponent,
  resolve: {
    data: OrdersService
  }
},
{path:'detail',component:OrderDetailComponent,
resolve: {
  data: OrderDetailService
}
,

},
{path:'product-detail',component:ProductDetailComponent,}
]

@NgModule({
  declarations: [OrdersComponent, OrderDetailComponent, ProductDetailComponent],
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
  ]
})
export class OrdersModule {
  
 }
