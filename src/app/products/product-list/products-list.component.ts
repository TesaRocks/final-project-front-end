import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { userId } from 'src/app/auth/ngrx/auth.selectors';
import { newLike } from 'src/app/likes/ngrx/likes.actions';
import {
  addLikesByUserIdPending,
  selectLikesByUserId,
} from 'src/app/likes/ngrx/likes.selectos';
import { updateHeader } from 'src/app/ngrx/header.actions';
import { IApplicationState } from '../../aplication-state';
import { ErrorMessage } from '../../shared/error-message';
import { countProducts, loadProductsPaginated } from '../ngrx/product.actions';
import {
  error,
  loadProductsPending,
  selectProducts,
  totalProducts,
} from '../ngrx/product.selectors';
import { IProduct } from '../product.interface';
import { loadLikesByUserId } from '../../likes/ngrx/likes.actions';

//Experimenting this is not applied yet
interface IData extends IProduct {
  like: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  products$!: Observable<IProduct[]>;
  loadProductsPending$!: Observable<boolean>;
  addLikesByUserIdPending$!: Observable<boolean>;
  error!: Subscription;
  totalProducts$!: Observable<number>;
  currentPage!: number;
  previousPage!: number;
  nextPage!: number;
  userId$!: Subscription;
  userId!: string;
  likes!: Observable<IProduct[]>;
  data$!: Observable<IData[]>;

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ updatedHeader: 'Products List' }));
    this.store.dispatch(countProducts.begin());
    this.totalProducts$ = this.store.select(totalProducts);
    this.userId$ = this.store.select(userId).subscribe((userId) => {
      if (userId) this.userId = userId;
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = parseInt(params['page']);
      this.previousPage = this.currentPage - 1;
      this.store.dispatch(
        loadProductsPaginated.begin({ page: params['page'] })
      );
      this.products$ = this.store.select(selectProducts);
      this.loadProductsPending$ = this.store.select(loadProductsPending);
      this.error = this.store.select(error).subscribe((error) => {
        if (error) {
          let errorDialog = this.dialog.open(ErrorMessage, {
            data: { message: error.message },
          });
          errorDialog.afterClosed().subscribe(() => {
            this.router.navigate(['']);
          });
        }
      });
      //Experimenting this is not applied yet
      this.store.dispatch(loadLikesByUserId.begin({ id: this.userId }));
      //Experimenting this is not applied yet
      this.likes = this.store.select(selectLikesByUserId);
      // As from here I need to implement the subscription and work the solution
    });
  }

  onNewLike(productId: number, index: number) {
    let idRaw;
    this.store.select(userId).subscribe((num) => (idRaw = num));
    let id = Number(idRaw);
    this.store.dispatch(newLike.begin({ productId, id }));
    this.addLikesByUserIdPending$ = this.store.select(addLikesByUserIdPending);
  }
  onChangePage(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.router.navigate(['/products'], {
      queryParams: { page: this.nextPage },
    });
  }

  ngOnDestroy() {
    this.error.unsubscribe();
    this.userId$.unsubscribe();
  }
}

// export class ProductsListComponent implements OnInit, OnDestroy {
//   constructor(
//     private store: Store<IApplicationState>,
//     private router: Router,
//     private route: ActivatedRoute,
//     public dialog: MatDialog
//   ) {}
//   products$!: Observable<IProduct[]>;
//   loadProductsPending$!: Observable<boolean>;
//   addLikesByUserIdPending$!: Observable<boolean>;
//   error!: Subscription;
//   totalProducts$!: Observable<number>;
//   currentPage!: number;
//   previousPage!: number;
//   nextPage!: number;
//   userId$!: Subscription;
//   userId!: string;
//   likes!: Subscription;
//   l!: IProduct[];

//   ngOnInit(): void {
//     this.store.dispatch(updateHeader({ updatedHeader: 'Products List' }));
//     this.store.dispatch(countProducts.begin());
//     this.totalProducts$ = this.store.select(totalProducts);
//     this.route.queryParams.subscribe((params: Params) => {
//       this.currentPage = parseInt(params['page']);
//       this.previousPage = this.currentPage - 1;
//       this.store.dispatch(
//         loadProductsPaginated.begin({ page: params['page'] })
//       );
//       this.products$ = this.store.select(selectProducts);
//       this.loadProductsPending$ = this.store.select(loadProductsPending);
//       this.error = this.store.select(error).subscribe((error) => {
//         if (error) {
//           let errorDialog = this.dialog.open(ErrorMessage, {
//             data: { message: error.message },
//           });
//           errorDialog.afterClosed().subscribe(() => {
//             this.router.navigate(['']);
//           });
//         }
//       });
//       this.userId$ = this.store.select(userId).subscribe((userId) => {
//         if (userId) this.userId = userId;
//       });

//       this.store.dispatch(loadLikesByUserId.begin({ id: this.userId }));
//       this.likes = this.store
//         .select(selectLikesByUserId)
//         .subscribe((likes) => (this.l = likes));
//     });
//   }

//   onNewLike(productId: number, index: number) {
//     let idRaw;
//     this.store.select(userId).subscribe((num) => (idRaw = num));
//     let id = Number(idRaw);
//     this.store.dispatch(newLike.begin({ productId, id }));
//     this.addLikesByUserIdPending$ = this.store.select(addLikesByUserIdPending);
//   }
//   onChangePage(event: PageEvent) {
//     this.nextPage = event.pageIndex + 1;
//     this.router.navigate(['/products'], {
//       queryParams: { page: this.nextPage },
//     });
//   }

//   ngOnDestroy() {
//     this.error.unsubscribe();
//     this.userId$.unsubscribe();
//     this.likes.unsubscribe();
//   }
// }
