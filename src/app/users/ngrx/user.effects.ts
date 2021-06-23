import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, concatMap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {
  loadUser,
  loadUsers,
  deleteUser,
  updateUser,
  addUser,
} from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers.begin),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          map((users) => loadUsers.success({ users: users })),
          catchError((error) => of(loadUsers.failure({ error })))
        )
      )
    )
  );
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
  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUser.success),
        concatMap((action) =>
          this.userService.updateUser(action.user.id, action.user.changes)
        ),
        tap(() => this.router.navigate(['users']))
      ),
    { dispatch: false }
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser.begin),
      mergeMap((action) =>
        this.userService.removeUser(action.id).pipe(
          map(() => deleteUser.success({ id: action.id })),
          catchError((error) => of(deleteUser.failure({ error })))
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
