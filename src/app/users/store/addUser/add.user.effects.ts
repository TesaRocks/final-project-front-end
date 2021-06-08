import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { addUser } from './add.user.actions';
@Injectable()
export class AddUserEffects {
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser.begin),
      mergeMap((action) =>
        this.userService.newUser(action.user).pipe(
          map((user) => addUser.success({ user })),
          catchError((error) => of(addUser.failure({ error })))
        )
      ),
      tap(() => this.router.navigate(['users']))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
