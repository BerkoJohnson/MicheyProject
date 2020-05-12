import ToDoState, { initializeState } from './todo.state';
import { createReducer, on, Action } from '@ngrx/store';
import * as TodoActions from './todo.action';
import ToDo from './todo.model';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(TodoActions.GetToDoAction, state => state),
  on(TodoActions.CreateToDoAction, (state: ToDoState, todo: ToDo) => {
    return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
  }),
  on(TodoActions.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: payload };
  }),
  on(TodoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  on(TodoActions.ErrorToDoAction, (state: ToDoState, error: Error) => {
    console.log(error);
    return { ...state, ToDoError: error };
  })
);

export function ToDoReducer(state: ToDoState | undefined, action: Action) {
  return reducer(state, action);
}
