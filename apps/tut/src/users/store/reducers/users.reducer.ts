import * as fromUsers from '../actions/users.action';
import { User } from '../model/user.model';

export interface UserState {
  data: User[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromUsers.UsersLoadActions
): UserState {
  switch (action.type) {
    case fromUsers.LOAD_USERS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromUsers.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    case fromUsers.LOAD_USERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}
