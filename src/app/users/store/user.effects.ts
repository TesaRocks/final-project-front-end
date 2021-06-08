import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, concatMap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { loadUser, loadUsers } from './user.actions';


@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers.begin),
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
      ofType(loadUser.begin),
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
      ofType(fromUserActions.addUser.beginAdd),
      mergeMap((action) =>
        this.userService.newUser(action.user).pipe(
          map((user) => fromUserActions.addUser.successAdd({ user })),
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
        ofType(fromUserActions.updateUser.beginUpdate),
        concatMap((action) =>
          this.userService.updateUser(action.user.id, action.user.changes)
        ),
        tap(() => this.router.navigate(['users']))
      ),
    { dispatch: false }
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.deleteUser.beginDelete),
      mergeMap((action) =>
        this.userService.removeUser(action.id).pipe(
          map(() =>
            fromUserActions.deleteUser.successDelete({ id: action.id })
          ),
          catchError((error) =>
            of(fromUserActions.deleteUser.failureDelete({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
