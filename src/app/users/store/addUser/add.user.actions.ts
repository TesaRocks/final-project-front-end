import { createAction, props } from '@ngrx/store';
import { IUser } from '../../user.interface';

//Add user
const begin = createAction('[User] Add User', props<{ user: IUser }>());
const success = createAction(
  '[User] Add User Success',
  props<{ user: IUser }>()
);
const failure = createAction(
  '[User] Add User Failure',
  props<{ error: any }>()
);
export const addUser = { begin, success, failure };
