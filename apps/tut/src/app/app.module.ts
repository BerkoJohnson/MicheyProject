import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { UsersComponent } from './users/users.component';
import { UserRowComponent } from './user-row/user-row.component';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from './users/users.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    UsersComponent,
    UserRowComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    StoreModule.forRoot({ users: fromUsers.reducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
