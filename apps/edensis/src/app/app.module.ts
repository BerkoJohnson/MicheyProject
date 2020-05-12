import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { DefaultModule } from './layouts/default/default.module';
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module';
import { PROVIDERS } from './providers';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    DefaultModule,
    FullwidthModule,
    RoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],

  providers: PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule {}
