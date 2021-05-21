import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../shared/data-service';
import { IUser } from './user.interface';
@Injectable({ providedIn: 'root' })
export class UserService {
  // userChanged = new Subject<IUser[]>();
  private users: IUser[] = [];
  constructor(private dataService: DataService) {}
  // setUsers(users: IUser[]) {
  //   this.users = users;
  //   this.userChanged.next(this.users.slice());
  // }
  getUsers() {
    this.dataService.fetchUsers().subscribe();
  }
}
