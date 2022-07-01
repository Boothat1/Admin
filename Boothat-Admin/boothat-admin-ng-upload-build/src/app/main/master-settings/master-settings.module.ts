import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterSettingsComponent } from './master-settings/master-settings.component';
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
import { QuillModule } from 'ngx-quill';
import { MatInputModule } from '@angular/material/input';
import { MasterSettingsService } from './master-settings/master-settings.service';
import { FormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';

const routes: Routes = [
  {
    path: '', component: MasterSettingsComponent,
    resolve: {
      data: MasterSettingsService
    }
  }
]

@NgModule({
  declarations: [MasterSettingsComponent],
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
    QuillModule,
    MatInputModule,
    FormsModule,
    NgxFileDropModule
  ]
})
export class MasterSettingsModule { }
