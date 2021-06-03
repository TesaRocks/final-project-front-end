import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { deleteUserActions } from './users.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Users] Get All Users'),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          map((users) => ({
            type: '[Users] Get All Users Success',
            users: users,
          })),
          catchError(() => of({ type: '[Users] Get All Users Failure' }))
        )
      )
    )
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserActions.deleteBegin),
      exhaustMap((action) =>
        this.userService.removeUser(action.id).pipe(
          map(() => deleteUserActions.deleteSuccess()),
          catchError((error) => of(deleteUserActions.deleteFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
