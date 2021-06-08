import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../../user.service';
import { loadUsers } from './load.users.actions';

@Injectable()
export class LoadUsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers.begin),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          map((users) => loadUsers.success({ users })),
          catchError((error) => of(loadUsers.failure({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private userService: UserService) {}
}
