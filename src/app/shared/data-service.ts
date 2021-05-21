import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../users/user.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}
  fetchUsers() {
    return this.http.get<IUser[]>('http://localhost:8008/user');
  }
}
