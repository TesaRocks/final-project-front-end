import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../user.interface';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUsers, deleteUser } from '../ngrx/user.actions';
import {
  loadUsersPending,
  selectUsers,
  deleteUserPending,
  error,
} from '../ngrx/user.selectors';
import { IApplicationState } from '../../aplication-state';
import { ErrorMessage } from '../../shared/error-message';
import { DeleteConfirm } from 'src/app/shared/delete-confirm';
import { updateHeader } from 'src/app/ngrx/header.actions';
@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
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
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  users$!: Observable<IUser[]>;
  pending$!: Observable<boolean>;
  pendingDelete$!: Observable<boolean>;
  error!: Subscription;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  ngOnInit() {
    this.store.dispatch(updateHeader({ updatedHeader: 'User List' }));
    this.store.dispatch(loadUsers.begin());
    this.users$ = this.store.select(selectUsers);
    this.pending$ = this.store.select(loadUsersPending);
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
  }
  onEdit(id: number) {
    this.router.navigate(['users', id, 'edit']);
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirm);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteUser.begin({ id: id }));
        this.pendingDelete$ = this.store.select(deleteUserPending);
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
      }
    });
  }

  ngOnDestroy() {
    this.error.unsubscribe();
  }
}
