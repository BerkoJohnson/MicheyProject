import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DefaultComponent } from './default.component';
import { VotingCenterComponent } from '../../modules/voting-center/voting-center.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarComponent } from '../../modules/sidebar/sidebar.component';

@NgModule({
  declarations: [DefaultComponent, VotingCenterComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DefaultModule {}
