import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IApplicationState } from 'src/app/aplication-state';
import { IProduct } from 'src/app/products/product.interface';
import { loadLikesByUserId } from '../ngrx/likes.actions';
import {
  loadLikesByUserIdPending,
  selectLikesByUserId,
} from '../ngrx/likes.selectos';
import { updateHeader } from 'src/app/ngrx/header.actions';
import { userId } from 'src/app/auth/ngrx/auth.selectors';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LikesComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {}
  likes$!: Observable<IProduct[]>;
  loadLikesByUserIdPending$!: Observable<boolean>;
  userId$!: Subscription;
  userId!: string;
  totalLikes: number = 100;
  items = ['Add suggestions here please'];

  ngOnInit(): void {
    this.title.setTitle('Likes');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadPage();
      });

    this.loadPage();
  }

  loadPage() {
    this.store.dispatch(updateHeader({ updatedHeader: 'My Wish List' }));
    this.userId$ = this.store.select(userId).subscribe((userId) => {
      if (userId) this.userId = userId;
    });
    this.store.dispatch(loadLikesByUserId.begin({ id: this.userId }));
    this.likes$ = this.store.select(selectLikesByUserId);
    this.loadLikesByUserIdPending$ = this.store.select(
      loadLikesByUserIdPending
    );
  }
  onAddItem(newItem: string) {
    this.items.push(newItem);
  }

  likeDetail(productId: number) {
    this.router.navigate([`detail/${productId}`], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.userId$.unsubscribe();
    this.title.setTitle('Front End');
  }
}
