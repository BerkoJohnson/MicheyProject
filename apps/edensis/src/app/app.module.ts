import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { RoutingModule } from './routing.module';
import { DefaultModule } from './layouts/default/default.module';
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module';

import { PROVIDERS } from './providers';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    DefaultModule,
    FullwidthModule,
    RoutingModule,
    BrowserAnimationsModule,
    EntityDataModule.forRoot(entityConfig),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule {}
