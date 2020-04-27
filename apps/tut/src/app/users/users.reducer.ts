import { createReducer, on, Action } from '@ngrx/store';
import { User } from './user.model';
import * as UsersLoadActions from './users.action';

export interface State {
  data: User[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  data: [],
  loading: false,
  loaded: false
};

const usersReducer = createReducer(
  initialState,
  on(UsersLoadActions.LoadUsers, state => {
    return {
      ...state,
      loading: true
    };
  }),
  on(UsersLoadActions.LoadUsersSuccess, (state, { users }) => {
    const updatedData = [...state.data, users];
    return {
      ...state,
      data: updatedData,
      loading: false,
      loaded: true
    };
  }),
  on(UsersLoadActions.LoadUsersFail, state => {
   return {
      ...state,
      loaded: false,
      loading: false
   }
  })
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
