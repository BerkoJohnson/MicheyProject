import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./modules/login/login.component";
import { ValidationComponent } from "./validation/validation.component";
import { VotingResultsComponent } from "./voting-results/voting-results.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthService } from "./services/auth.service";
import { ElectionService } from "./services/election.service";
import { JwtInterceptor } from "./interceptors/jwt-interceptors";
import { ErrorInterceptor } from "./interceptors/error-interceptors";
import { AuthInterceptor } from "./interceptors/auth-interceptors";
import { ElectionResolver } from "./resolvers/elections.resolver";
import { RoutingModule } from "./routing.module";
import { DefaultModule } from "./layouts/default/default.module";
import { FullwidthModule } from "./layouts/fullwidth/fullwidth.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    DefaultModule,
    FullwidthModule,
    RoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    ElectionService,
    AuthService,
    ElectionResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
