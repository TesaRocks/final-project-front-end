import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
    public dialog: MatDialog
  ) {}
  products$!: Observable<IProduct[]>;
  pending$!: Observable<boolean>;
  error!: Subscription;
  ngOnInit(): void {
    this.store.dispatch(loadProducts.begin());
    this.products$ = this.store.select(selectProducts);
    console.log(this.products$);

    this.pending$ = this.store.select(loadProductsPending);
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
  }
  ngOnDestroy() {
    this.error.unsubscribe();
  }
}
