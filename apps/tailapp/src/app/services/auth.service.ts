import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>(null);
  _user = this.user$.asObservable();
  _authError = new BehaviorSubject<string>('');
  authError$ = this._authError.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<{ success: boolean; token: string }>('/api/users/login', {
        username,
        password,
      })
      .pipe(
        tap((res: { success: boolean; message?: string; token?: string }) => {
          if (res.success) {
            this._authError.next('');
            this.saveToken(res.token);
          }
          if (!res.success) {
            this._authError.next(res.message);
          }
        }),
        shareReplay()
      );
  }

  logout() {
    localStorage.removeItem('bdToken');
    this.user$.next(null);
    this.router.navigateByUrl('/login');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  saveToken(token) {
    localStorage.setItem('bdToken', token);
  }

  retrieveToken() {
    return localStorage.getItem('bdToken');
  }

  parseToken() {
    if (this.retrieveToken()) {
      return JSON.parse(window.atob(this.retrieveToken().split('.')[1]));
    }
    return null;
  }

  getExpiration() {
    if (this.parseToken()) {
      const { exp, data } = this.parseToken();
      this.user$.next(data);
      return moment.unix(exp);
    }
    return null;
  }
}
