import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IUser } from '../user.interface';

/** **************************************
 *  Load Users
 ***************************************/
const loadUsersBegin = createAction('[User] Load Users Begin');
const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: IUser[] }>()
);
const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const loadUsers = {
  begin: loadUsersBegin,
  success: loadUsersSuccess,
  failure: loadUsersFailure,
};

/** **************************************
 *  Load User
 ***************************************/
const loadUserBegin = createAction(
  '[User] Load User Begin',
  props<{ id: number }>()
);
const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ selectedUser: IUser }>()
);
const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);
export const loadUser = {
  begin: loadUserBegin,
  success: loadUserSuccess,
  failure: loadUserFailure,
};

/** **************************************
 *  Add user
 ***************************************/
const addUserBegin = createAction(
  '[User] Add User Begin',
  props<{ user: IUser }>()
);
const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: IUser }>()
);
const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: any }>()
);
export const addUser = {
  begin: addUserBegin,
  success: addUserSuccess,
  failure: addUserFailure,
};

/** **************************************
 *  Update User
 ***************************************/

const updateUserSuccess = createAction(
  '[User] Update User success',
  props<{ user: Update<IUser> }>()
);
export const updateUser = {
  success: updateUserSuccess,
};

/** **************************************
 *  Delete User
 ***************************************/
const deleteUserBegin = createAction(
  '[User/API] Delete User begin',
  props<{ id: number }>()
);
const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: number }>()
);
const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);
export const deleteUser = {
  begin: deleteUserBegin,
  success: deleteUserSuccess,
  failure: deleteUserFailure,
};
