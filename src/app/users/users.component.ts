import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/data-service';
import { IUser } from './user.interface';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  users!: IUser[];
  displayedColumns: string[] = ['name', 'email', 'edit', 'delete'];

  ngOnInit(): void {
    this.dataService.fetchUsers().subscribe((users: IUser[]) => {
      this.users = users;
    });
  }
  onEdit(id: number) {
    this.router.navigate(['users', id, 'edit']);
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(UserDeleteConfirm);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete(id);
      }
    });
  }

  onDelete(id: number) {
    this.dataService.removeUser(id).subscribe((message: string) => {
      console.log(message);
    });
  }
}
@Component({
  selector: 'user-delete-confirm',
  templateUrl: 'users-delete-confirm.html',
})
export class UserDeleteConfirm {}
