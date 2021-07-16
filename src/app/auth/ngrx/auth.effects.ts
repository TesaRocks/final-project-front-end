import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { loginUser } from './auth.actions';

@Injectable()
export class AuthEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser.begin),
      mergeMap((action) =>
        this.authService.loginUser(action.user).pipe(
          map((response) => loginUser.success({ serverResponse: response })),
          catchError((error) => of(loginUser.failure({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private authService: AuthService) {}
}
