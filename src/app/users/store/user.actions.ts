import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IUser } from '../user.interface';

//Load Users
const begin = createAction('[User] Load Users');
const success = createAction(
  '[User] Load Users Success',
  props<{ users: IUser[] }>()
);
const failure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);
//Load User
const beginLoad = createAction('[User] Load User', props<{ id: number }>());
const successLoad = createAction(
  '[User] Load User Success',
  props<{ selectedUser: IUser }>()
);
const failureLoad = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);
//Add user
const beginAdd = createAction('[User] Add User', props<{ user: IUser }>());
const successAdd = createAction(
  '[User] Add User Success',
  props<{ user: IUser }>()
);
const failureAdd = createAction(
  '[User] Add User Failure',
  props<{ error: any }>()
);
//Update User
const beginUpdate = createAction(
  '[User] Update User',
  props<{ user: Update<IUser> }>()
);
//Delete User
const beginDelete = createAction(
  '[User/API] Delete User',
  props<{ id: number }>()
);
const successDelete = createAction(
  '[User] Delete User Success',
  props<{ id: number }>()
);
const failureDelete = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);
export const loadUsers = { begin, success, failure };
export const loadUser = { beginLoad, successLoad, failureLoad };
export const addUser = { beginAdd, successAdd, failureAdd };
export const updateUser = { beginUpdate };
export const deleteUser = { beginDelete, successDelete, failureDelete };
