import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from './product.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../aplication-state';
import { ErrorMessage } from '../shared/error-message';
import { loadProducts } from './store/product.actions';
import { loadProductsPending, selectProducts } from './store/product.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private store: Store<IApplicationState>,
    private router: Router
  ) {}
  products$!: Observable<IProduct[]>;
  pending$!: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(loadProducts.begin());
    this.products$ = this.store.select(selectProducts);
    this.pending$ = this.store.select(loadProductsPending);
  }
}
