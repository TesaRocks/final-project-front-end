import { createAction, props } from '@ngrx/store';
import { IUser } from '../../user.interface';

const begin = createAction('[User] Load User', props<{ id: number }>());
const success = createAction(
  '[User] Load User Success',
  props<{ selectedUser: IUser }>()
);
const failure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const loadUser = { begin, success, failure };
