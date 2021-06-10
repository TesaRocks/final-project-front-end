import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './user.interface';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUsers, deleteUser } from './store/user.actions';
import {
  loadUsersPending,
  selectUsers,
  deleteUserPending,
  error,
} from './store/user.selectors';
import { IApplicationState } from '../aplication-state';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in'),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  users$!: Observable<IUser[]>;
  pending$!: Observable<boolean>;
  pendingDelete$!: Observable<boolean>;
  error!: Subscription;
  displayedColumns: string[] = ['name', 'email', 'actions'];

  ngOnInit() {
    this.store.dispatch(loadUsers.begin());
    this.users$ = this.store.select(selectUsers);
    this.pending$ = this.store.select(loadUsersPending);
    this.error = this.store.select(error).subscribe((error) => {
      if (error) {
        let errorDialog = this.dialog.open(ErrorBox);
        errorDialog.afterClosed().subscribe(() => {
          this.router.navigate(['']);
        });
      }
    });
  }
  onEdit(id: number) {
    this.router.navigate(['users', id, 'edit']);
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(UserDeleteConfirm);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteUser.begin({ id: id }));
        this.pendingDelete$ = this.store.select(deleteUserPending);
        this.error = this.store.select(error).subscribe((error) => {
          if (error) {
            let errorDialog = this.dialog.open(ErrorBox);
            errorDialog.afterClosed().subscribe(() => {
              this.router.navigate(['']);
            });
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.error.unsubscribe();
  }
}
@Component({
  selector: 'user-delete-confirm',
  templateUrl: 'users-delete-confirm.html',
})
export class UserDeleteConfirm {}

@Component({
  selector: 'error-box',
  templateUrl: 'error-box.html',
})
export class ErrorBox {}
