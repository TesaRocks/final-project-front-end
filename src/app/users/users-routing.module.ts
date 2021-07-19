import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/:id/edit',
    component: UserEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'users/new', component: UserEditComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
