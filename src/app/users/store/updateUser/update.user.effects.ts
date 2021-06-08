import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, concatMap } from 'rxjs/operators';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { updateUser } from './update.user.actions';

@Injectable()
export class UpdateUserEffects {
  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUser.begin),
        concatMap((action) =>
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
