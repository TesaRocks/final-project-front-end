import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './product-list/products-list.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
  },
  // { path: 'users/:id/edit', component: UserEditComponent },
  // { path: 'users/new', component: UserEditComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
