import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import * as fromUserActions from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[User] Load Users'),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          map((users) => ({
            type: '[User] Load Users Success',
            users: users,
          })),
          catchError((error) =>
            of({ type: '[User] Load Users Failure', error: error })
          )
        )
      )
    )
  );
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.loadUser),
      mergeMap((action) =>
        this.userService.fetchUser(action.id).pipe(
          map((user) => ({
            type: '[User] Load User Success',
            selectedUser: user,
          })),
          catchError((error) =>
            of({ type: '[User] Load User Failure', error: error })
          )
        )
      )
    )
  );
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.addUser),
      mergeMap((action) =>
        this.userService.newUser(action.user).pipe(
          map((user) => fromUserActions.addUserSuccess({ user })),
          catchError((error) =>
            of({ type: '[User] Add User Failure', error: error })
          )
        )
      ),
      tap(() => this.router.navigate(['users']))
    )
  );
  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUserActions.updateUser),
        mergeMap((action) =>
          this.userService.updateUser(action.user.id, action.user.changes)
        ),
        tap(() => this.router.navigate(['users']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
