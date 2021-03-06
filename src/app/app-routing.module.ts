import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: MainComponent },
  {
    path: 'invoice',
    loadChildren: () =>
      import('./invoice/invoice.module').then((m) => m.InvoiceModule),
  },
  {
    path: 'invoice/detail/:id',
    loadChildren: () =>
      import('./invoice/invoice.module').then((m) => m.InvoiceModule),
  },
  {
    path: 'invoice/new',
    loadChildren: () =>
      import('./invoice/invoice.module').then((m) => m.InvoiceModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'users/:id/edit',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'users/new',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'likes',
    loadChildren: () =>
      import('./likes/likes.module').then((m) => m.LikesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
