import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RoleDirective } from './directives/role.directive';
import { ColorDirective } from './directives/color.directive';
import { ValueDirective } from './directives/value.directive';
import { HostComponent } from './host.component';

@NgModule({
  declarations: [
    AppComponent,
    HostComponent,
    RoleDirective,
    ColorDirective,
    ValueDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
