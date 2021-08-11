import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IApplicationState } from 'src/app/aplication-state';
import { IProduct } from 'src/app/products/product.interface';
import { deleteLike } from '../../ngrx/likes.actions';
import { selectLikesByUserId } from '../../ngrx/likes.selectos';
import { userId } from 'src/app/auth/ngrx/auth.selectors';

@Component({
  selector: 'app-likes-detail',
  templateUrl: './likes-detail.component.html',
  styleUrls: ['./likes-detail.component.scss'],
})
export class LikesDetailComponent implements OnInit {
  productid!: number;
  product!: IProduct[];
  userId!: number;
  constructor(
    private route: ActivatedRoute,
    private store: Store<IApplicationState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productid = Number(params['id']);
      this.store
        .select(selectLikesByUserId)
        .pipe(
          map((product) =>
            product.filter((pr) => pr.productId === this.productid)
          )
        )
        .subscribe((p) => (this.product = p));
    });
  }
  onDislike() {
    this.store.select(userId).subscribe((userId) => {
      if (userId) this.userId = Number(userId);
    });

    this.store.dispatch(
      deleteLike.begin({
        productId: this.product[0].productId,
        id: this.userId,
      })
    );
    this.router.navigate(['home']);
  }
}
