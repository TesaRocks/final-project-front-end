import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data-service';
import { IUser } from './user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private dataService: DataService) {}
  users!: IUser[];

  ngOnInit(): void {
    this.dataService.fetchUsers().subscribe((users: IUser[]) => {
      this.users = users;
    });
  }
}
