import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { IApplicationState } from 'src/app/aplication-state';
import { loadProductsAll } from 'src/app/products/ngrx/product.actions';
import {
  selectProducts,
  error,
  loadProductsPending,
} from 'src/app/products/ngrx/product.selectors';
import { IProduct } from 'src/app/products/product.interface';
import { IInvoice } from '../invoice.interface';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessage } from '../../shared/error-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.scss'],
})
export class InvoiceNewComponent implements OnInit, OnDestroy {
  products!: FormControl;
  productListSub!: Subscription;
  productList!: IProduct[];
  loadProductsPending$!: Observable<boolean>;
  error!: Subscription;
  formNewInvoice!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<IApplicationState>,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.formNewInvoice = this.fb.group({
      customer: ['', [Validators.required, Validators.maxLength(45)]],
      shoppingCart: this.fb.array([]),
    });
  }
  get shoppingCart(): FormArray {
    return this.formNewInvoice.get('shoppingCart') as FormArray;
  }
  newShopping(): FormGroup {
    return this.fb.group({
      products: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.store.dispatch(loadProductsAll.begin());
    this.productListSub = this.store
      .select(selectProducts)
      .subscribe((products) => {
        this.productList = products;
      });
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
    this.onAddProduct();
  }
  onAddProduct() {
    this.shoppingCart.push(this.newShopping());
  }
  onRemoveShopping(i: number) {
    this.shoppingCart.removeAt(i);
  }
  onSubmit() {
    const name = this.formNewInvoice.value.customer;
    const products = this.formNewInvoice.value.shoppingCart;
    console.log(products);
  }

  hasError(
    inputName: 'customer' | 'shoppingCart.products' | 'shoppingCart.quantity',
    errorType: string
  ) {
    return this.formNewInvoice.get(inputName)?.hasError(errorType);
  }

  ngOnDestroy() {
    this.productListSub.unsubscribe();
  }
}
