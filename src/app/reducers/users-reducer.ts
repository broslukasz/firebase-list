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

    case usersActions.EDIT_USER_SUCCESS: {
      return state.map(user => {
        return user.id === action.payload.id ? action.payload : user;
      });
    }

    default: {
      return state;
    }

  }
}
