import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class DefaultModule { }
