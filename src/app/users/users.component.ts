import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUser } from './user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private http: HttpClient) {}
  users!: IUser[];

  ngOnInit(): void {
    this.http
      .get<IUser[]>('http://localhost:8008/user')
      .subscribe((usersData) => {
        this.users = usersData;
        console.log(this.users);
      });
  }
}
