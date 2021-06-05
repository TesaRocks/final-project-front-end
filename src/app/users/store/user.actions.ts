import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IUser } from '../user.interface';

export const loadUsers = createAction(
  '[User/API] Load Users',
  props<{ users: IUser[] }>()
);

export const addUser = createAction(
  '[User/API] Add User',
  props<{ user: IUser }>()
);

export const upsertUser = createAction(
  '[User/API] Upsert User',
  props<{ user: IUser }>()
);

export const addUsers = createAction(
  '[User/API] Add Users',
  props<{ users: IUser[] }>()
);

export const upsertUsers = createAction(
  '[User/API] Upsert Users',
  props<{ users: IUser[] }>()
);

export const updateUser = createAction(
  '[User/API] Update User',
  props<{ user: Update<IUser> }>()
);

export const updateUsers = createAction(
  '[User/API] Update Users',
  props<{ users: Update<IUser>[] }>()
);

export const deleteUser = createAction(
  '[User/API] Delete User',
  props<{ id: string }>()
);

export const deleteUsers = createAction(
  '[User/API] Delete Users',
  props<{ ids: string[] }>()
);

export const clearUsers = createAction('[User/API] Clear Users');
