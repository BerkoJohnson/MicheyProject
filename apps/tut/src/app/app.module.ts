import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { UsersComponent } from './users/users.component';
import { UserRowComponent } from './user-row/user-row.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, UsersComponent, UserRowComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
