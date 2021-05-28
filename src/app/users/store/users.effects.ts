import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Users] Load Users'),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          map((users) => ({
            type: '[Users API] Users Loaded Success',
            payload: users,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
