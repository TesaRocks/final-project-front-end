import { createAction, props } from '@ngrx/store';

//Delete User
const begin = createAction('[User/API] Delete User', props<{ id: number }>());
const success = createAction(
  '[User] Delete User Success',
  props<{ id: number }>()
);
const failure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);
export const deleteUser = { begin, success, failure };
