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
import { IInvoice, IItem } from '../invoice.interface';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessage } from '../../shared/error-message';
import { Router } from '@angular/router';
import { addInvoicePending } from '../ngrx/invoice.selectors';
import { addInvoice } from '../ngrx/invoice.actions';

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
  addInvoicePending$!: Observable<boolean>;

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
      quantity: [
        '',
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
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
    this.shoppingCart.push(this.newShopping());
  }
  onAddProduct() {
    let filteredProductList = this.productList.filter(
      (product) =>
        product.productId !==
        this.formNewInvoice.value.shoppingCart[0].products.productId
    );
    this.productList = filteredProductList;
    this.shoppingCart.push(this.newShopping());
  }
  onRemoveShopping(i: number) {
    this.shoppingCart.removeAt(i);
  }
  onSubmit() {
    const name = this.formNewInvoice.value.customer;
    const products = this.formNewInvoice.value.shoppingCart;
    let newInvoice: IInvoice = {
      invoiceId: null,
      customerName: name,
      invoiceItems: [],
    };
    for (let i = 0; i < products.length; i++) {
      let newProduct: IItem = {
        productId: products[i].products.productId,
        quantity: products[i].quantity,
      };
      newInvoice.invoiceItems.push(newProduct);
    }

    this.store.dispatch(addInvoice.begin({ invoice: newInvoice }));
    this.addInvoicePending$ = this.store.select(addInvoicePending);
  }

  hasError(inputName: 'customer', errorType: string) {
    return this.formNewInvoice.get(inputName)?.hasError(errorType);
  }
  hasErrorShoppingCart(
    inputName: 'products' | 'quantity',
    errorType: string,
    i: number
  ) {
    return this.shoppingCart.controls[i].get(inputName)?.hasError(errorType);
  }

  ngOnDestroy() {
    this.productListSub.unsubscribe();
  }
}
