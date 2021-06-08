import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IUser } from '../user.interface';

/** **************************************
 *  Load Users
 ***************************************/
const loadUsersBegin = createAction('[User] Load Users');
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
const beginLoad = createAction('[User] Load User', props<{ id: number }>());
const successLoad = createAction(
  '[User] Load User Success',
  props<{ selectedUser: IUser }>()
);
const failureLoad = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);
export const loadUser = {
  begin: beginLoad,
  success: successLoad,
  failure: failureLoad,
};

/** **************************************
 *  Add user
 ***************************************/
const beginAdd = createAction('[User] Add User', props<{ user: IUser }>());
const successAdd = createAction(
  '[User] Add User Success',
  props<{ user: IUser }>()
);
const failureAdd = createAction(
  '[User] Add User Failure',
  props<{ error: any }>()
);
export const addUser = {
  begin: beginAdd,
  success: successAdd,
  failure: failureAdd,
};

/** **************************************
 *  Update User
 ***************************************/
const updateUserBegin = createAction(
  '[User] Update User Begin',
  props<{ user: Update<IUser> }>()
);
const updateUserSuccess = createAction(
  '[User] Update User success',
  props<{ user: Update<IUser> }>()
);
const updateUserFailure = createAction(
  '[User] Update User failure',
  props<{ error: any }>()
);
export const updateUser = {
  begin: updateUserBegin,
  success: updateUserSuccess,
  failure: updateUserFailure,
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
