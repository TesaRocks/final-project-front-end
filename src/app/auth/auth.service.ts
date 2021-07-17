import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../users/user.interface';
import { IAuthResponse } from './auth-response.interface';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  loginUser(user: IUser): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>('/api/user/login', {
        email: user.email,
        password: user.password,
      })
      .pipe(shareReplay());
  }
}
