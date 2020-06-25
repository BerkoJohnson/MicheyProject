import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';

const Routes: Routes = [
  { path: 'login', component: HomeComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'admins',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/admin/admin.module').then((mod) => mod.AdminModule),
  },
  { path: 'products', canActivate: [AuthGuard], component: ProductsComponent },
  { path: 'services', canActivate: [AuthGuard], component: ServicesComponent },
  { path: 'contacts', canActivate: [AuthGuard], component: ContactsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(Routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
