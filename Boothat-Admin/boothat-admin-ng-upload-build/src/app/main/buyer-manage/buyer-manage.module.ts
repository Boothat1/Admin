import { NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerManageComponent } from './buyer-manage/buyer-manage.component';
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
import { DetailComponent } from './buyer-manage/detail/detail.component';
import { EditComponent } from './buyer-manage/edit/edit.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BuyerManageService } from './buyer-manage.service';
import { BuyerDetailService } from './buyer-manage/detail/buyerDetail.service';

  const routes:Routes=[
    {path:'',component:BuyerManageComponent,
    resolve: {
      data: BuyerManageService
    }
  },
    {path:'detail',component:DetailComponent,
    resolve: {
      data: BuyerDetailService
    },
  },
    {path:'edit',component:EditComponent},
    {path:'detail-overview',component:EditComponent},
  ]



@NgModule({
  declarations: [BuyerManageComponent, DetailComponent, EditComponent],
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
  ]
})
export class BuyerManageModule implements OnDestroy {
  ngOnDestroy(): void {
    console.log("Buyer Manage destroy module");
  }
}
