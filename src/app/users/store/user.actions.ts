import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IUser } from '../user.interface';

//Load Users
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: IUser[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);
//Load User
export const loadUser = createAction(
  '[User] Load User',
  props<{ id: number }>()
);
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ selectedUser: IUser }>()
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);
//Add user
export const addUser = createAction(
  '[User] Add User',
  props<{ user: IUser }>()
);
export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: IUser }>()
);
export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: any }>()
);
//Update User
export const updateUser = createAction(
  '[User] Update User',
  props<{ user: Update<IUser> }>()
);

export const deleteUser = createAction(
  '[User/API] Delete User',
  props<{ id: string }>()
);
