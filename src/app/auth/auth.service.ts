import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../users/user.interface';
import { IAuthResponse } from './auth-response.interface';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  loginUser(user: IUser): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>('/api/user/login', {
        email: user.email,
        password: user.password,
      })
      .pipe(
        shareReplay(),
        tap((res) => {
          this.setSession(res);
        })
      );
  }
  private setSession(authResult: IAuthResponse) {
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', String(authResult.expiresIn));
    localStorage.setItem('role', authResult.role);
    localStorage.setItem('userId', authResult.id);
  }
}
