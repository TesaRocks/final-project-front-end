import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IApplicationState } from 'src/app/aplication-state';
import { IProduct } from 'src/app/products/product.interface';
import { selectLikesByUserId } from '../../ngrx/likes.selectos';

@Component({
  selector: 'app-likes-detail',
  templateUrl: './likes-detail.component.html',
  styleUrls: ['./likes-detail.component.scss'],
})
export class LikesDetailComponent implements OnInit {
  id!: number;
  product!: IProduct[];
  constructor(
    private route: ActivatedRoute,
    private store: Store<IApplicationState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.store
        .select(selectLikesByUserId)
        .pipe(
          map((product) => product.filter((pr) => pr.productId === this.id))
        )
        .subscribe((p) => (this.product = p));
    });
  }
}
