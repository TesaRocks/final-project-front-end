import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
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
export class InvoiceNewComponent implements OnInit {
  productListSub!: Subscription;
  productList!: IProduct[];
  loadProductsPending$!: Observable<boolean>;
  error!: Subscription;
  formNewInvoice: FormGroup = this.fb.group({
    customer: ['', [Validators.required, Validators.maxLength(45)]],
    //products: new FormControl(''),
  });
  products = new FormControl();
  constructor(
    private fb: FormBuilder,
    private store: Store<IApplicationState>,
    public dialog: MatDialog,
    private router: Router
  ) {}

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
  }

  onSubmit() {
    // const newInvoice: IInvoice = {
    //   customerName: this.formNewInvoice.value.customer,
    // };
  }

  hasError(inputName: 'customer', errorType: string) {
    return this.formNewInvoice.get(inputName)?.hasError(errorType);
  }
}
