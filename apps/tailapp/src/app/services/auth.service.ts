import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject(null);
  _user = this.user$.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('/api/users/login', { username, password }).pipe(
      tap((res) => this.setSession),
      shareReplay()
    );
  }

  private setSession(authResult) {
    console.log(authResult);
    // const expiresat = moment().add(authResult.expiresAt, 'second');

    localStorage.setItem('token', authResult);
  }

  public isLoggedIn() {
    return true;
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  saveToken(token) {
    localStorage.setItem('bdToken', token);
  }

  retrieveToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsImRhdGEiOnsiX2lkIjoiNWVlZDBjZWE5OGY0MDIyZGNjMzAwM2E5IiwibmFtZSI6IkJlcmtvIEpvaG5zb24iLCJ1c2VybmFtZSI6ImNoaWVmYiIsImVtYWlsIjoiYmVya29qb2huc29uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEUzRFcwbFY4UlBNNFc3UndPQ0lJL2VaelVWRnVRV1JOakM5YjdRUTlWbG5xdVNxa1o1N2JHIiwiY29udGFjdCI6IjAyNDgxNjAzOTEifSwiaWF0IjoxNTkyNjAyNDkyLCJleHAiOjE1OTMyMDcyOTJ9.GbVH5BafRKc3NifSmIYTIQJmh8T_XrA6wk5UzRhOILg';
    // return localStorage.get('bdToken'); // use this after completing AuthService implementation
  }

  parseToken() {
    return JSON.parse(window.atob(this.retrieveToken().split('.')[1]));
  }

  getExpiration() {
    const expiresAt = this.parseToken().exp;
    console.log(expiresAt)
    return moment.unix(expiresAt);
  }
}
