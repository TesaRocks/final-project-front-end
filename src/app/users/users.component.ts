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
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  `,
  //templateUrl: './users.component.html',
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
    private userService: UserService,
    private store: Store<{ users: IUser[] }>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  //users!: IUser[];
  users$: Observable<IUser[]> = this.store.select((state) => state.users);
  displayedColumns: string[] = ['name', 'email', 'actions'];

  ngOnInit(): void {
    // this.userService.fetchUsers().subscribe((users: IUser[]) => {
    //   this.users = users;
    // });
    this.store.dispatch({ type: '[Users] Get All - Begin' });
  }
  onEdit(id: number) {
    this.router.navigate(['users', id, 'edit']);
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(UserDeleteConfirm);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.removeUser(id).subscribe();
      }
    });
  }
}
@Component({
  selector: 'user-delete-confirm',
  templateUrl: 'users-delete-confirm.html',
})
export class UserDeleteConfirm {}
