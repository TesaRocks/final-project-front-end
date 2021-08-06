import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikesComponent } from './likesByUser/likes.component';
import { LikesRoutingModule } from './likes-routing.module';

@NgModule({
  declarations: [LikesComponent],
  imports: [CommonModule, LikesRoutingModule],
})
export class LikesModule {}
