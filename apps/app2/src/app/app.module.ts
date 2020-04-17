import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { ElectionService } from "./services/election.service";
import { DefaultModule } from "./layouts/default/default.module";
import { FullwidthModule } from "./layouts/fullwidth/fullwidth.module";
import { JwtInterceptor } from "./interceptors/jwt-interceptors";
import { AuthInterceptor } from "./interceptors/auth-interceptors";
import { ErrorInterceptor } from "./interceptors/error-interceptors";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    DefaultModule,
    FullwidthModule,
    AppRoutingModule
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
    AuthService,
    ElectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
