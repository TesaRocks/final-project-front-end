import { createAction, props } from '@ngrx/store';
import { IUser } from '../user.interface';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: IUser[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);
