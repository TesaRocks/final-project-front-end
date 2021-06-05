import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Users] Load Users'),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          map((users) => ({
            type: '[Users] Load Users Success',
            users: users,
          })),
          catchError((error) =>
            of({ type: '[Users] Load Users Failure', error: error })
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private userService: UserService) {}
}
