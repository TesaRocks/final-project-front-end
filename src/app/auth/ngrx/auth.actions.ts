import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/users/user.interface';
import { IAuthResponse } from '../auth-response.interface';

/** **************************************
 *  Login User
 ***************************************/

const loginUserBegin = createAction(
  '[Auth] Login User Begin',
  props<{ user: IUser }>()
);

const loginUserSuccess = createAction(
  '[Auth] Login User Success',
  props<{ serverResponse: IAuthResponse }>()
);

const loginUserFailure = createAction(
  '[Auth] Login User Failure',
  props<{ error: any }>()
);
export const loginUser = {
  begin: loginUserBegin,
  success: loginUserSuccess,
  failure: loginUserFailure,
};

/** **************************************
 *  Check Local storage
 ***************************************/

export const checkLocalStorage = createAction('[Auth] Check Local Storage');

/** **************************************
 *  Logout User
 ***************************************/

const logoutUserSuccess = createAction('[Auth] Logout User Success');

const logoutUserFailure = createAction(
  '[Auth] Logout User Failure',
  props<{ error: any }>()
);
export const logoutUser = {
  success: logoutUserSuccess,
  failure: logoutUserFailure,
};
