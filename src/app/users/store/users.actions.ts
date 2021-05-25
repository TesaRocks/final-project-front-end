import { Action } from '@ngrx/store';
import { IUser } from '../user.interface';

export const SET_USERS = '[Users] Set Users';

export class SetUsers implements Action {
  readonly type = SET_USERS;
  constructor(public payload: IUser[]) {}
}

//export type UsersActions = SetUsers;
