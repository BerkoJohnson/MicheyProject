import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DocumentComponent } from './document/document.component';
import { DocumentListComponent } from './document-list/document-list.component';

const config: SocketIoConfig = {
  url: 'http://localhost:4444'
};
@NgModule({
  declarations: [AppComponent, DocumentComponent, DocumentListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
