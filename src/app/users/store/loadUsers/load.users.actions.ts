import { createAction, props } from '@ngrx/store';
import { IUser } from '../../user.interface';

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
export const loadUsers = { begin, success, failure };
