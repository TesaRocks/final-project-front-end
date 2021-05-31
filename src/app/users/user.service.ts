import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user.interface';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

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
