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
const beginDelete = createAction('[Users] Delete - Begin');
const successDelete = createAction(
  '[Users] Delete - Success',
  props<{ id: number }>()
);
const failureDelete = createAction(
  '[Users] Delete - Failure',
  props<{ error: any }>()
);

export const getAllUsersActions = {
  begin,
  success,
  failure,
  beginDelete,
  successDelete,
  failureDelete,
};
