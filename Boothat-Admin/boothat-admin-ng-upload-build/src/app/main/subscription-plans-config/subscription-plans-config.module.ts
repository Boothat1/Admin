import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlansConfigComponent } from './subscription-plans-config/subscription-plans-config.component';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule, MatButtonModule, MatTableModule, MatCardModule, MatDividerModule, MatDialogModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubscriptionPlansConfigService } from './subscription-plans-config/subscription-plans-config.service';
const routes:Routes=[
  {path:'',component:SubscriptionPlansConfigComponent,
    resolve:{
      data:SubscriptionPlansConfigService
    }
}
]


@NgModule({
  declarations: [SubscriptionPlansConfigComponent],
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
export class SubscriptionPlansConfigModule { }
