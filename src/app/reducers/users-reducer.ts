import * as usersActions from '../actions/users.actions';
import { User } from '../models/user.model';

export function usersReducer(state: User[] = [], action: usersActions.Action) {
  switch (action.type) {
    case usersActions.LOAD_USERS_SUCCESS: {
      return action.payload;
    }

    case usersActions.DELETE_USER_SUCCESS: {
      return state.filter(user => user.id !== action.payload);
    }

    default: {
      return state;
    }

  }
}
