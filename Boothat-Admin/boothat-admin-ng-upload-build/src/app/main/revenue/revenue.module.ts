import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueComponent } from './revenue/revenue.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:RevenueComponent,
  // resolve:{
  //   data:RevenueComponent
  // } 
}
]


@NgModule({
  declarations: [RevenueComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RevenueModule { }
