import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { LikesService } from '../likes.service';
import { loadLikesByUserId } from './likes.actions';

@Injectable()
export class InvoiceEffects {
  loadLikesByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLikesByUserId.begin),
      mergeMap((action) =>
        this.likesService.fetchLikesByUserId(action.id).pipe(
          map((likes) => loadLikesByUserId.success({ likesByUserId: likes })),
          catchError((error) => of(loadLikesByUserId.failure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private likesService: LikesService) {}
}
