import { User } from '../models/user.model';

export const LOAD_USERS = 'LOAD_USERS;';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS;';

export const DELETE_USER = 'DELETE_USER;';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS;';

export const EDIT_USER = 'EDIT_USER;';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS;';


export class LoadUsersAction {
  readonly type = LOAD_USERS;
  constructor() { }
}

export class LoadUsersActionSuccess {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: User[]) { }
}

export class DeleteUserAction {
  readonly type = DELETE_USER;
  constructor(public payload: string) { }
}

export class DeleteUserActionSuccess {
  readonly type = DELETE_USER_SUCCESS;
  constructor(public payload: string) { }
}

export class EditUserAction {
  readonly type = EDIT_USER;
  constructor(public payload: User) { }
}

export class EditUserActionSuccess {
  readonly type = EDIT_USER_SUCCESS;
  constructor(public payload: User) { }
}

export type Action =
  LoadUsersAction |
  LoadUsersActionSuccess |
  DeleteUserAction |
  DeleteUserActionSuccess |
  EditUserAction |
  EditUserActionSuccess;
