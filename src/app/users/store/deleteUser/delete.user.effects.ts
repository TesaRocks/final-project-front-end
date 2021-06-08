import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../../user.service';
import { deleteUser } from './delete.user.actions';

@Injectable()
export class DeleteUserEffects {
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

  constructor(private actions$: Actions, private userService: UserService) {}
}
