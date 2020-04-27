import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const LoadUsers = createAction('[Api/Users] Load Users');
export const LoadUsersSuccess = createAction(
  '[Api/Users] Load Users Success',
  props<{ users: User[] }>()
);
export const LoadUsersFail = createAction('[Api/Users] Load Users Fail');
