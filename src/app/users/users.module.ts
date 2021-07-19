import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './ngrx/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './ngrx/user.effects';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UsersListComponent, UserEditComponent],
  imports: [
    RouterModule,
    FlexLayoutModule,
    UsersRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromUser.usersFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UsersModule {}
