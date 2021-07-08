import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceNewComponent } from './invoice-new/invoice-new.component';

const routes: Routes = [
  {
    path: 'invoice',
    component: InvoiceListComponent,
  },
  {
    path: 'invoice/detail/:id',
    component: InvoiceDetailComponent,
  },
  {
    path: 'invoice/new',
    component: InvoiceNewComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
