import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadProductsPaginated,
  deleteProduct,
  loadProduct,
  loadProductsAll,
  countProducts,
} from './product.actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from '../products.service';

@Injectable()
export class ProductEffects {
  loadProductsPaginated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsPaginated.begin),
      mergeMap((action) =>
        this.productService.fetchProductsPaginated(action.page).pipe(
          map((product) =>
            loadProductsPaginated.success({ products: product })
          ),
          catchError((error) => of(loadProductsPaginated.failure({ error })))
        )
      )
    )
  );
  loadProductsAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsAll.begin),
      mergeMap(() =>
        this.productService.fetchProducts().pipe(
          map((product) => loadProductsAll.success({ products: product })),
          catchError((error) => of(loadProductsAll.failure({ error })))
        )
      )
    )
  );
  countProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countProducts.begin),
      mergeMap(() =>
        this.productService.countProducts().pipe(
          map((count) => countProducts.success({ totalProducts: count })),
          catchError((error) => of(countProducts.failure({ error })))
        )
      )
    )
  );
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProduct.begin),
      mergeMap((action) =>
        this.productService.fetchProduct(action.id).pipe(
          map((user) => loadProduct.success({ selectedProduct: user })),
          catchError((error) => of(loadProduct.failure({ error })))
        )
      )
    )
  );
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct.begin),
      mergeMap((action) =>
        this.productService.removeProduct(action.id).pipe(
          map(() => deleteProduct.success({ id: action.id })),
          catchError((error) => of(deleteProduct.failure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
