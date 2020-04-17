import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { LoginComponent } from './modules/login/login.component';

const ROUTES: Routes = [
    {
        path: '',
        component: DefaultComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'elections',
                loadChildren: () => import('./modules/setup/setup.module').then(mod => mod.SetupModule)
            }
        ]
    },
    {
        path: '',
        component: FullwidthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class RoutingModule {}
