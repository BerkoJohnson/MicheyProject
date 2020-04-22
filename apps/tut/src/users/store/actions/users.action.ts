import { Action } from '@ngrx/store';
import { User } from '../model/user.model';

// load Users

export const LOAD_USERS = '[Users] Load Users';
export const LOAD_USERS_FAIL = '[Users] Load Users Fail';
export const LOAD_USERS_SUCCESS = '[Users] Load Users Success';

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
}

export class LoadUsersFail implements Action {
  readonly type = LOAD_USERS_FAIL;
  constructor(public payload: any) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

// action types
export type UsersLoadActions = LoadUsers | LoadUsersFail | LoadUsersSuccess;
