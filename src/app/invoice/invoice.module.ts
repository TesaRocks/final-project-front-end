import { NgModule } from '@angular/core';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { RouterModule } from '@angular/router';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromInvoice from './ngrx/invoice.reducer';
import { InvoiceEffects } from './ngrx/invoice.effects';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceDetailComponent],
  imports: [
    RouterModule,
    InvoiceRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature(fromInvoice.invoiceFeatureKey, fromInvoice.reducer),
    EffectsModule.forFeature([InvoiceEffects]),
  ],
})
export class InvoiceModule {}
