import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikesComponent } from './likesByUser/likes.component';
import { LikesRoutingModule } from './likes-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLikes from './ngrx/likes.reducer';
import { LikesEffects } from './ngrx/likes.effects';
import { MaterialModule } from '../shared/material.module';
import { LikesDetailComponent } from './likesByUser/likes-detail/likes-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfoMessageComponent } from './info-message/info-message.component';
@NgModule({
  declarations: [LikesComponent, LikesDetailComponent, InfoMessageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LikesRoutingModule,
    MaterialModule,
    StoreModule.forFeature(fromLikes.likesFeatureKey, fromLikes.reducer),
    EffectsModule.forFeature([LikesEffects]),
  ],
})
export class LikesModule {}
