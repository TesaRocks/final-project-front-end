import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { LikesService } from '../likes.service';
import { deleteLike, loadLikesByUserId, newLike } from './likes.actions';

@Injectable()
export class LikesEffects {
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
  newLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newLike.begin),
      mergeMap((action) =>
        this.likesService.newLike(action.productId, action.id).pipe(
          map(() => newLike.success()),
          catchError((error) => of(newLike.failure({ error })))
        )
      )
    )
  );
  deleteLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteLike.begin),
      mergeMap((action) =>
        this.likesService.deleteLike(action.productId, action.id).pipe(
          map(() => deleteLike.success()),
          catchError((error) => of(deleteLike.failure({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private likesService: LikesService) {}
}