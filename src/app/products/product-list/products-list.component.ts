import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IProduct } from '../product.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../aplication-state';
import { ErrorMessage } from '../../shared/error-message';
import { loadProducts } from '../ngrx/product.actions';
import {
  error,
  loadProductsPending,
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
  error!: Subscription;
  currentPage!: number;
  previousPage!: number;
  nextPage!: number;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = parseInt(params['page']);
      this.previousPage = this.currentPage - 1;
      this.store.dispatch(loadProducts.begin({ page: params['page'] }));
      this.products$ = this.store.select(selectProducts);
      this.loadProductsPending$ = this.store.select(loadProductsPending);
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
  onNext() {
    this.nextPage = this.currentPage + 1;
    this.router.navigate(['/products'], {
      queryParams: { page: this.nextPage },
    });
  }
  onPrevious() {
    this.previousPage = this.currentPage - 1;
    this.router.navigate(['/products'], {
      queryParams: { page: this.previousPage },
    });
  }

  ngOnDestroy() {
    this.error.unsubscribe();
  }
}
