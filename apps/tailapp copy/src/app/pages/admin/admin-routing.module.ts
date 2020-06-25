import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './add-product/add-product.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'add-product', component: AddProductComponent},
      {path: 'update-product', component: AddProductComponent},
      {path: 'get-products', component: AddProductComponent},
      {path: 'get-products', component: AddProductComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
