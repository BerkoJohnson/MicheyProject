import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { GetProductsComponent } from './get-products/get-products.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateProductImageComponent } from './update-product-image/update-product-image.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    GetProductsComponent,
    UpdateProductComponent,
    UpdateProductImageComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
