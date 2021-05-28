import { createAction, props } from '@ngrx/store';
import { IUser } from '../user.interface';

export const load_users = createAction('[Users] Load Users');

export const users_loaded_success = createAction(
  '[Users API] Users Loaded Success'
  //props<{ users: IUser[] }>()
);
