import { Action } from '@ngrx/store';
import { createAction } from '@ngrx/store';
import { IUser } from '../user.interface';

export const set_users = createAction('[Users] Set_Users');
