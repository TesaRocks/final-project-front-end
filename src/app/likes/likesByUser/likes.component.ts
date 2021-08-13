import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IApplicationState } from 'src/app/aplication-state';
import { IProduct } from 'src/app/products/product.interface';
import { loadLikesByUserId } from '../ngrx/likes.actions';
import {
  loadLikesByUserIdPending,
  selectLikesByUserId,
} from '../ngrx/likes.selectos';
import { updateHeader } from 'src/app/ngrx/header.actions';
import { userId } from 'src/app/auth/ngrx/auth.selectors';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  likes$!: Observable<IProduct[]>;
  loadLikesByUserIdPending$!: Observable<boolean>;
  userId$!: Subscription;
  userId!: string;

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ updatedHeader: 'My Wish List' }));
    this.userId$ = this.store.select(userId).subscribe((userId) => {
      if (userId) this.userId = userId;
    });
    this.store.dispatch(loadLikesByUserId.begin({ id: this.userId }));
    this.likes$ = this.store.select(selectLikesByUserId);
    this.loadLikesByUserIdPending$ = this.store.select(
      loadLikesByUserIdPending
    );
  }
  likeDetail(productId: number) {
    this.router.navigate([`detail/${productId}`], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.userId$.unsubscribe();
  }
}
