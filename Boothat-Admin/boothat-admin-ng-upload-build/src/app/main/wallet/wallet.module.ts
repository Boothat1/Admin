import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet/wallet.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule, MatButtonModule, MatTableModule, MatCardModule, MatDividerModule, MatDialogModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { WalletService } from './wallet/wallet.service';

const routes:Routes=[
  {path:'',component:WalletComponent,
  resolve:{
    data:WalletService
    }
}
]

@NgModule({
  declarations: [WalletComponent],
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
export class WalletModule { }
