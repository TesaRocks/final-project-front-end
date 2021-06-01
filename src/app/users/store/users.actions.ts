import { createAction, props } from '@ngrx/store';
import { IUser } from '../user.interface';

const begin = createAction('[Users] Get All - Begin');
const success = createAction(
  '[Users] Get All - Success',
  props<{ users: IUser[] }>()
);
const failure = createAction(
  '[Users] Get All - Failure',
  props<{ error: any }>()
);
const deleteUser = createAction(
  '[Users] Delete - Success',
  props<{ id: number }>()
);

export const getAllUsersActions = {
  begin,
  success,
  failure,
  deleteUser,
};
