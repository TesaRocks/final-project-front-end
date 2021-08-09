import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LikesDetailComponent } from './likesByUser/likes-detail/likes-detail.component';
import { LikesComponent } from './likesByUser/likes.component';

const routes: Routes = [
  {
    path: '',
    component: LikesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'detail/:id',
        component: LikesDetailComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikesRoutingModule {}
