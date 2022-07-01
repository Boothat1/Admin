import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoCodeComponent } from './promo-code/promo-code.component';
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
import { PromoCodeService } from './promo-code/promo-code.service';
import { DetailComponent } from './promo-code/detail/detail.component';
import { MatDatepickerModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';

const routes:Routes=[
  {path:'',component:PromoCodeComponent,
  resolve: {
    data: PromoCodeService
  } 
},
{path:'create',component:DetailComponent},
{path:'edit',component:DetailComponent},

]

@NgModule({
  declarations: [PromoCodeComponent, DetailComponent],
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
    MatDatepickerModule,
    MatSlideToggleModule
  ] 
})
export class PromoCodesModule { }
