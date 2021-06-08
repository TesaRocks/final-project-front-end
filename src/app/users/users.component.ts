import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUsers } from './store/loadUsers/load.users.actions';
import { deleteUser } from './store/deleteUser/delete.user.actions';
import { UserState } from './store/loadUsers/load.users.reducer';
import { selectUsers } from './store/user.selectors';
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
export class UsersComponent implements OnInit {
  constructor(
    private store: Store<UserState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  users$!: Observable<IUser[]>;
  displayedColumns: string[] = ['name', 'email', 'actions'];

  ngOnInit() {
    this.store.dispatch(loadUsers.begin());
    this.users$ = this.store.select(selectUsers);
  }
  onEdit(id: number) {
    this.router.navigate(['users', id, 'edit']);
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(UserDeleteConfirm);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteUser.begin({ id: id }));
      }
    });
  }
}
@Component({
  selector: 'user-delete-confirm',
  templateUrl: 'users-delete-confirm.html',
})
export class UserDeleteConfirm {}
