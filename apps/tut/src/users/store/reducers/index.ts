import { ActionReducerMap } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export interface UsersState {
  users: fromUsers.UserState;
}

export const reducers: ActionReducerMap<UsersState> = {
  users: fromUsers.reducer
};
