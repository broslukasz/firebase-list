import { Injectable } from '@angular/core';
import { UsersDataService } from '../users/services/users-data.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usersActions from './../actions/users.actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersEffects {

  constructor(
    private usersDataService: UsersDataService,
    private actions$: Actions
  ) { }

  @Effect() loadUsers$ = this.actions$.pipe(
    ofType(usersActions.LOAD_USERS),
    switchMap(() => this.usersDataService.getUsers()),
    map(users => new usersActions.LoadUsersActionSuccess(users))
  );

  @Effect() deleteUser$ = this.actions$.pipe(
    ofType(usersActions.DELETE_USER),
    switchMap((action: usersActions.DeleteUserAction) => this.usersDataService.remove(action.payload)),
    map(userId => new usersActions.DeleteUserActionSuccess(userId))
  );

  @Effect() editUser$ = this.actions$.pipe(
    ofType(usersActions.EDIT_USER),
    switchMap((action: usersActions.EditUserAction) => this.usersDataService.edit(action.payload)),
    map(user => new usersActions.EditUserActionSuccess(user))
  );
}
