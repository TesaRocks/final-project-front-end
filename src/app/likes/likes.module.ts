import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikesComponent } from './likesByUser/likes.component';
import { LikesRoutingModule } from './likes-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLikes from './ngrx/likes.reducer';
import { LikesEffects } from './ngrx/likes.effects';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [LikesComponent],
  imports: [
    CommonModule,
    LikesRoutingModule,
    MaterialModule,
    StoreModule.forFeature(fromLikes.likesFeatureKey, fromLikes.reducer),
    EffectsModule.forFeature([LikesEffects]),
  ],
})
export class LikesModule {}
