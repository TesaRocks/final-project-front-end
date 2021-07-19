import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceNewComponent } from './invoice-new/invoice-new.component';

const routes: Routes = [
  {
    path: 'invoice',
    component: InvoiceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoice/detail/:id',
    component: InvoiceDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoice/new',
    component: InvoiceNewComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
