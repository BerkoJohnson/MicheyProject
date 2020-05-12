import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import ToDoState from '../todo.state';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import ToDo from '../todo.model';
import * as ToDoActions from '../todo.action';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'todo-list',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];
  // Title = '';
  // IsCompleted = false;
  todoError: Error = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ todos: ToDoState }>
  ) {
    this.todo$ = store.pipe(select('todos'));
    this.form = this.fb.group({
      Title: '',
      IsCompleted: false
    });
  }

  ngOnInit() {
    this.store.dispatch(ToDoActions.BeginGetToDoAction());

    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();
  }

  createToDo() {
    const todo: ToDo = {
      Title: this.Title.value,
      IsCompleted: this.IsCompleted.value
    };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.form.reset({
      Title: '',
      IsCompleted: false
    });
  }

  get Title() {
    return this.form.get('Title');
  }
  get IsCompleted() {
    return this.form.get('IsCompleted');
  }
}
