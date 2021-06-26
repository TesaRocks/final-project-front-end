import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IProduct } from '../product.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../aplication-state';
import { ErrorMessage } from '../../shared/error-message';
import {
  deleteProduct,
  loadProduct,
  loadProducts,
} from '../ngrx/product.actions';
import {
  deleteProductPending,
  error,
  loadProductsPending,
  selectNext,
  selectPrevious,
  selectProducts,
} from '../ngrx/product.selectors';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  products$!: Observable<IProduct[]>;
  loadProductsPending$!: Observable<boolean>;
  pendingDelete$!: Observable<boolean>;
  error!: Subscription;
  previous$!: Observable<boolean>;
  next$!: Observable<boolean>;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.store.dispatch(
        loadProducts.begin({ page: params['page'], limit: params['limit'] })
      );
      this.products$ = this.store.select(selectProducts);
      this.loadProductsPending$ = this.store.select(loadProductsPending);
      this.previous$ = this.store.select(selectPrevious);
      this.next$ = this.store.select(selectNext);
      this.error = this.store.select(error).subscribe((error) => {
        if (error) {
          let errorDialog = this.dialog.open(ErrorMessage, {
            data: { message: error.message },
          });
          errorDialog.afterClosed().subscribe(() => {
            this.router.navigate(['']);
          });
        }
      });
    });
  }
  onPrevious() {
    const page: number = parseInt(this.route.snapshot.queryParams['page']) - 1;
    this.router.navigate(['products'], {
      queryParams: { page: page, limit: 4 },
    });
  }
  onNext() {
    const page: number = parseInt(this.route.snapshot.queryParams['page']) + 1;
    this.router.navigate(['products'], {
      queryParams: { page: page, limit: 4 },
    });
  }
  onBuy(product: IProduct) {
    localStorage.setItem('product', JSON.stringify(product));

    // this.store.dispatch(deleteProduct.begin({ id: product.productId }));
    // this.pendingDelete$ = this.store.select(deleteProductPending);
    // this.error = this.store.select(error).subscribe((error) => {
    //   if (error) {
    //     let errorDialog = this.dialog.open(ErrorMessage, {
    //       data: { message: error.message },
    //     });
    //     errorDialog.afterClosed().subscribe(() => {
    //       this.router.navigate(['']);
    //     });
    //   }
    // });
  }
  ngOnDestroy() {
    this.error.unsubscribe();
  }
}
