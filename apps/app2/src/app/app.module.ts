import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module';
import { providers } from './services/providers';

const config: SocketIoConfig = {
  url: 'http://localhost:7700'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    DefaultModule,
    FullwidthModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FontAwesomeModule
  ],
  providers: [providers],
  bootstrap: [AppComponent]
})
export class AppModule {}
