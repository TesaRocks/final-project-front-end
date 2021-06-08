import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../../user.service';
import { loadUser } from './load.user.actions';
@Injectable()
export class LoadUserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser.begin),
      mergeMap((action) =>
        this.userService.fetchUser(action.id).pipe(
          map((user) => loadUser.success({ selectedUser: user })),
          catchError((error) => of(loadUser.failure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
