import { NgModule } from '@angular/core';
import { UserDeleteConfirm, UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UserEditComponent, UserDeleteConfirm],
  imports: [RouterModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
