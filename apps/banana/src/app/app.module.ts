import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BananasComponent } from './bananas/bananas.component';

@NgModule({
  declarations: [
    AppComponent,
    BananasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {initialNavigation: 'enabled'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
