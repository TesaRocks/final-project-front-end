import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IApplicationState } from '../../aplication-state';
import { ErrorMessage } from 'src/app/shared/error-message';
import { ActivatedRoute, Router } from '@angular/router';
import { IInvoice } from '../invoice.interface';
import { loadInvoiceById } from '../ngrx/invoice.actions';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  error,
  loadInvoiceByIdPending,
  selectInvoiceById,
} from '../ngrx/invoice.selectors';
import { updateHeader } from 'src/app/ngrx/header.actions';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in'),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = [
    'id',
    'product',
    'description',
    'price',
    'quantity',
    'subtotal',
  ];
  invoiceId!: number;
  invoiceByIdSubscription!: Subscription;
  invoiceById!: IInvoice;
  loadInvoiceByIdPending$!: Observable<boolean>;
  error!: Subscription;
  total!: number;

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ updatedHeader: 'Detailed Invoice' }));
    this.invoiceId = this.route.snapshot.params.id;
    this.store.dispatch(loadInvoiceById.begin({ id: this.invoiceId }));
    this.invoiceByIdSubscription = this.store
      .select(selectInvoiceById)
      .subscribe((invoice) => {
        this.invoiceById = invoice;
        if (invoice.invoiceItems !== undefined) {
          this.total = invoice.invoiceItems
            .map((item) => item.quantity * item.price!)
            .reduce((acc, value) => acc + value, 0);
        }
      });
    this.loadInvoiceByIdPending$ = this.store.select(loadInvoiceByIdPending);
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
    this.invoiceByIdSubscription.unsubscribe();
  }
}
