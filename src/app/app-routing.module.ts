import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'users',
    component: UsersComponent,
  },
  { path: 'users/:id/edit', component: UserEditComponent },
  { path: 'users/new', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
