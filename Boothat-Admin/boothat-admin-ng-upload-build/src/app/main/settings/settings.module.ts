import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSortModule, MatSnackBarModule, MatTableModule, MatSelectModule, MatDatepickerModule, MatTooltipModule, MatGridListModule, MatTabsModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UserSettingsComponent } from './settings.component';
import { SettingService } from './setting.service';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'',component:UserSettingsComponent,resolve:{
    data:SettingService
  }},
]

@NgModule({
    declarations: [UserSettingsComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MatCardModule,
      MatButtonModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatPaginatorModule,
      MatRippleModule,
      MatSortModule,
      MatSnackBarModule,
      MatTableModule,
      MatSelectModule,
      MatDatepickerModule,
      MatTooltipModule,
      FuseSharedModule,
      FuseWidgetModule,
      MatGridListModule,
      NgxMaterialTimepickerModule,
      NgxFileDropModule,
      MatDividerModule,
      ReactiveFormsModule,
      MatTabsModule,
      FormsModule
    ]
  })

export class SettingsModule
{
}
