import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IProduct } from '../product.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../aplication-state';
import { ErrorMessage } from '../../shared/error-message';
import { loadProductsPaginated, countProducts } from '../ngrx/product.actions';
import {
  error,
  loadProductsPending,
  selectProducts,
  totalProducts,
} from '../ngrx/product.selectors';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { updateHeader } from 'src/app/ngrx/header.actions';
import { userId } from 'src/app/auth/ngrx/auth.selectors';
import { newLike } from 'src/app/likes/ngrx/likes.actions';

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
  error!: Subscription;
  totalProducts$!: Observable<number>;
  currentPage!: number;
  previousPage!: number;
  nextPage!: number;

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ updatedHeader: 'Products List' }));
    this.store.dispatch(countProducts.begin());
    this.totalProducts$ = this.store.select(totalProducts);
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
    });
  }

  onNewLike(productId: number, index: number) {
    let idRaw;
    this.store.select(userId).subscribe((num) => (idRaw = num));
    let id = Number(idRaw);
    this.store.dispatch(newLike.begin({ productId, id }));
    // let button =
    //   document.getElementsByClassName('card-picture')[index].children[3]
    //     .children[0];
    // console.log(button);
  }
  onChangePage(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.router.navigate(['/products'], {
      queryParams: { page: this.nextPage },
    });
  }

  ngOnDestroy() {
    this.error.unsubscribe();
  }
}

// productsSub!: Subscription;
//   products!: IProduct[];
//   loadProductsPending$!: Observable<boolean>;
//   error!: Subscription;
//   totalProducts$!: Observable<number>;
//   currentPage!: number;
//   previousPage!: number;
//   nextPage!: number;
//   likesSub!: Subscription;
//   likesList!: IProduct[];
//   loadLikesByUserIdPending$!: Observable<boolean>;
//   userId$!: Subscription;
//   userId!: string;
// ngOnInit(): void {
//   this.store.dispatch(updateHeader({ updatedHeader: 'Products List' }));
//   this.store.dispatch(countProducts.begin());
//   this.totalProducts$ = this.store.select(totalProducts);
//   this.route.queryParams.subscribe((params: Params) => {
//     this.currentPage = parseInt(params['page']);
//     this.previousPage = this.currentPage - 1;
//     this.store.dispatch(
//       loadProductsPaginated.begin({ page: params['page'] })
//     );
//     this.productsSub = this.store
//       .select(selectProducts)
//       .subscribe((p) => (this.products = p));
//     this.loadProductsPending$ = this.store.select(loadProductsPending);
//     this.error = this.store.select(error).subscribe((error) => {
//       if (error) {
//         let errorDialog = this.dialog.open(ErrorMessage, {
//           data: { message: error.message },
//         });
//         errorDialog.afterClosed().subscribe(() => {
//           this.router.navigate(['']);
//         });
//       }
//     });
//     this.userId$ = this.store.select(userId).subscribe((userId) => {
//       if (userId) this.userId = userId;
//     });
//     this.store.dispatch(loadLikesByUserId.begin({ id: this.userId }));
//     this.likesSub = this.store
//       .select(selectLikesByUserId)
//       .subscribe((l) => (this.likesList = l));

//     this.loadLikesByUserIdPending$ = this.store.select(
//       loadLikesByUserIdPending
//     );
//   });
// }
// this.productsSub.unsubscribe();
//     this.likesSub.unsubscribe();
