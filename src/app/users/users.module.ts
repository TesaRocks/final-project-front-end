import { NgModule } from '@angular/core';
import { UserDeleteConfirm, UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromUserState from './store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users.effects';

@NgModule({
  declarations: [UsersComponent, UserEditComponent, UserDeleteConfirm],
  imports: [
    RouterModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromUserState.userStateFeatureKey,
      fromUserState.reducers,
      { metaReducers: fromUserState.metaReducers }
    ),
    EffectsModule.forFeature([UsersEffects]),
  ],
})
export class UsersModule {}
