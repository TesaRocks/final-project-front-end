import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from 'src/app/aplication-state';
import { IProduct } from 'src/app/products/product.interface';
import { loadLikeByProductId, deleteLike } from '../../ngrx/likes.actions';
import { deleteLikesByUserIdPending } from '../../ngrx/likes.selectos';
import { userId } from 'src/app/auth/ngrx/auth.selectors';
import { likeByProductId } from '../../ngrx/likes.selectos';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-likes-detail',
  templateUrl: './likes-detail.component.html',
  styleUrls: ['./likes-detail.component.scss'],
})
export class LikesDetailComponent implements OnInit, OnDestroy {
  productid!: number;
  product$!: Observable<IProduct[] | null>;
  userId!: number;
  userId$!: Subscription;
  deleteLikesByUserIdPending$!: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<IApplicationState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productid = Number(params['id']);
      this.store.dispatch(
        loadLikeByProductId.begin({ productId: this.productid })
      );
      this.product$ = this.store.select(likeByProductId);
    });
  }
  onDislike(productId: number) {
    this.userId$ = this.store.select(userId).subscribe((userId) => {
      if (userId) this.userId = Number(userId);
    });
    this.store.dispatch(
      deleteLike.begin({
        productId: productId,
        id: this.userId,
      })
    );
    this.deleteLikesByUserIdPending$ = this.store.select(
      deleteLikesByUserIdPending
    );
    this.router.navigate(['/likes']);
  }
  ngOnDestroy() {
    if (this.userId$ !== undefined) this.userId$.unsubscribe();
  }
}
