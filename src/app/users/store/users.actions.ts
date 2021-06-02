import { createAction, props } from '@ngrx/store';
import { IUser } from '../user.interface';

const begin = createAction('[Users] Get All - Begin');
const success = createAction(
  '[Users Effect] Get All - Success',
  props<{ users: IUser[] }>()
);

//delete user
const deleteUserBegin = createAction(
  '[Users] Delete - Begin',
  props<{ id: number }>()
);

const deleteUserSuccess = createAction('[Users Effect] Delete - Success');

export const getAllUsersActions = {
  begin,
  success,
  deleteUserBegin,
  deleteUserSuccess,
};
