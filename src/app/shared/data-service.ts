import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../users/user.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
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
}
