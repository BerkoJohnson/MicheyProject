import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./modules/login/login.component";
import { ValidationComponent } from "./validation/validation.component";
import { VotingResultsComponent } from "./voting-results/voting-results.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "setup",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/setup/setup.module").then(mod => mod.SetupModule)
  },
  {
    path: "validation",
    component: ValidationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "results",
    component: VotingResultsComponent,
    canActivate: [AuthGuard]
  },
  { path: "***", redirectTo: "login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
