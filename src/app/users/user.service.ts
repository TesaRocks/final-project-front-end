import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Subject } from 'rxjs';
import { IUser } from './user.interface';
@Injectable({ providedIn: 'root' })
export class UserService {
  // userChanged = new Subject<IUser[]>();
  constructor(private http: HttpClient) {}
  //private users: IUser[] = [];

  // setUsers(users: IUser[]) {
  //   this.users = users;
  //   this.userChanged.next(this.users.slice());
  // }

  fetchUsers() {
    return this.http.get<IUser[]>('/api/user');
  }
  fetchUser(id: number) {
    return this.http.get<IUser>(`/api/user/${id}`);
  }
  updateUser(id: number, user: IUser) {
    return this.http.put<IUser>(`/api/user/${id}`, user);
  }
  removeUser(id: number) {
    return this.http.delete<string>(`/api/user/${id}`);
  }
  newUser(user: IUser) {
    return this.http.post<IUser>('/api/user/', user);
  }
}
