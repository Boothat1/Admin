import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExclusiveBoothComponent } from './exclusive-booth/exclusive-booth.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material';
import { ExclusiveBoothService } from './exclusive-booth/exclusive-booth.service';
import { FusePipesModule } from '@fuse/pipes/pipes.module';

const routes: Routes = [
  {
    path: '', component: ExclusiveBoothComponent,
    resolve: {
      data: ExclusiveBoothService
    }
  }
]


@NgModule({
  declarations: [ExclusiveBoothComponent,],
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
    MatSlideToggleModule,
    FusePipesModule
  ]
})
export class ExclusiveBoothModule { }
