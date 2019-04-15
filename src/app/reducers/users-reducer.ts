import * as usersActions from '../actions/users.actions';

export function usersReducer(state = [], action: usersActions.Action) {
  switch (action.type) {
    case usersActions.LOAD_USERS_SUCCESS: {
      return action.payload;
    }

    default: {
      return state;
    }

  }
}
