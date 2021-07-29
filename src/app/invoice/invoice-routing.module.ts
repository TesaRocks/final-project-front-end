import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceNewComponent } from './invoice-new/invoice-new.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    component: InvoiceDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    component: InvoiceNewComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
