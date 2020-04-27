import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { RoutingModule } from './routing.module';
import { DefaultModule } from './layouts/default/default.module';
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module';

import { PROVIDERS } from './providers';
// import { EntityDataModule } from '@ngrx/data';
// import { entityConfig } from './entity-metadata';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
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
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
    // EntityDataModule.forRoot(entityConfig),
    // StoreRouterConnectingModule.forRoot(),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule {}
