import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as ToDoActions from './todo.action';
import { mergeMap, catchError, map } from 'rxjs/operators';
import ToDo from './todo.model';
import { of, Observable } from 'rxjs';
import { ToDoService } from './todo.service';

@Injectable()
export class ToDoEffect {
  constructor(private todoService: ToDoService, private action$: Actions) {}

  GetToDo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginGetToDoAction),
      mergeMap(action =>
        this.todoService.getTodos().pipe(
          map((data: ToDo[]) => {
            return ToDoActions.SuccessGetToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  CreateToDo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginCreateToDoAction),
      mergeMap(action =>
        this.todoService.createTodo(action.payload).pipe(
          map((data: ToDo) => {
            return ToDoActions.SuccessCreateToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );
}
