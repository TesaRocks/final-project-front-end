import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  concatMap,
  exhaustMap,
} from 'rxjs/operators';
import { UserService } from '../user.service';
import { getAllUsersActions } from './users.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Users] Get All - Begin'),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          map((users) => ({
            type: '[Users Effect] Get All - Success',
            users: users,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUsersActions.deleteUserBegin),
      exhaustMap((action) =>
        this.userService.removeUser(action.id).pipe(
          map(() => getAllUsersActions.deleteUserSuccess()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
