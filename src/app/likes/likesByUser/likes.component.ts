import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IApplicationState } from 'src/app/aplication-state';
import { IProduct } from 'src/app/products/product.interface';
import { loadLikesByUserId } from '../ngrx/likes.actions';
import {
  loadLikesByUserIdPending,
  selectLikesByUserId,
} from '../ngrx/likes.selectos';
import { updateHeader } from 'src/app/ngrx/header.actions';
import { selectAuth } from 'src/app/auth/ngrx/auth.selectors';
import { IAuthResponse } from 'src/app/auth/auth-response.interface';
@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
  constructor(private store: Store<IApplicationState>) {}
  likes$!: Observable<IProduct[]>;
  loadLikesByUserIdPending$!: Observable<boolean>;
  userId$!: Observable<IAuthResponse[]>;

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ updatedHeader: 'My Wish List' }));
    this.store.dispatch(loadLikesByUserId.begin({ id: 1 }));
    this.likes$ = this.store.select(selectLikesByUserId);
    this.loadLikesByUserIdPending$ = this.store.select(
      loadLikesByUserIdPending
    );
    this.userId$ = this.store.select(selectAuth);
    console.log(this.userId$);
  }
}
