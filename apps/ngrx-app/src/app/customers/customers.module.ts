import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomersComponent } from './customer/customer.component';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { CustomerListComponent } from '../customer-list/customer-list.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent
  ],
  imports: [CommonModule]
})
export class CustomersModule {}
