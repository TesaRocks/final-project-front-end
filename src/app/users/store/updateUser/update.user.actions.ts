import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IUser } from '../../user.interface';

//Update User
const begin = createAction(
  '[User] Update User',
  props<{ user: Update<IUser> }>()
);
export const updateUser = { begin };
