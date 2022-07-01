import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoteComponent } from './promote/promote.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule, MatButtonModule, MatTableModule, MatCardModule, MatDividerModule, MatDialogModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PromoteService } from './promote/promote.service';

const routes:Routes=[
  {path:'',component:PromoteComponent,
  resolve:{
    data:PromoteService
  }
}
]

@NgModule({
  declarations: [PromoteComponent],
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
export class PromoteModule { }
