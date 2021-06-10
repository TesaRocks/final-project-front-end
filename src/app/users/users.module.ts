import { NgModule } from '@angular/core';
import { UserDeleteConfirm, UsersComponent, ErrorBox } from './users.component';
import { UserEditComponent, ErrorBox2 } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';

@NgModule({
  declarations: [
    UsersComponent,
    UserEditComponent,
    UserDeleteConfirm,
    ErrorBox,
    ErrorBox2,
  ],
  imports: [
    RouterModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromUser.usersFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UsersModule {}
