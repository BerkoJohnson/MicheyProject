import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ToDoReducer } from './todo.reducer';
import { ToDoComponent } from './ToDo/to-do.component';
import { ToDoService } from './todo.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToDoEffect } from './todo.effect';
import { environment } from '../environments/environment.prod';

@NgModule({
  declarations: [AppComponent, ToDoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    StoreModule.forRoot({ todos: ToDoReducer }),
    EffectsModule.forRoot([ToDoEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
