import { NgModule } from '@angular/core';
import { UserDeleteConfirm, UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { addReducer } from './store/addUser/add.user.reducer';
import { deleteReducer } from './store/deleteUser/delete.user.reducer';
import { loadUserReducer } from './store/loadUser/load.user.reducer';
import {
  loadUsersReducer,
  usersFeatureKey,
} from './store/loadUsers/load.users.reducer';
import { updateUserReducer } from './store/updateUser/update.user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AddUserEffects } from './store/addUser/add.user.effects';
import { DeleteUserEffects } from './store/deleteUser/delete.user.effects';
import { LoadUserEffects } from './store/loadUser/load.user.effects';
import { LoadUsersEffects } from './store/loadUsers/load.users.effects';
import { UpdateUserEffects } from './store/updateUser/update.user.effects';
@NgModule({
  declarations: [UsersComponent, UserEditComponent, UserDeleteConfirm],
  imports: [
    RouterModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(usersFeatureKey, loadUsersReducer),
    StoreModule.forFeature(usersFeatureKey, addReducer),
    StoreModule.forFeature(usersFeatureKey, deleteReducer),
    StoreModule.forFeature(usersFeatureKey, loadUserReducer),
    StoreModule.forFeature(usersFeatureKey, updateUserReducer),
    EffectsModule.forFeature([
      AddUserEffects,
      DeleteUserEffects,
      LoadUserEffects,
      LoadUsersEffects,
      UpdateUserEffects,
    ]),
  ],
})
export class UsersModule {}
