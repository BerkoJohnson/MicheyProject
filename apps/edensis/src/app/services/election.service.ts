import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Election } from '../interfaces/all';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BROWSER_STORAGE } from '../interfaces/storage';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  constructor(private http: HttpClient) {
    this.getElections().subscribe();
  }

  // tslint:disable-next-line:variable-name
  _election = new BehaviorSubject<Election>(null);
  // tslint:disable-next-line:variable-name
  private _elections = new BehaviorSubject<Election[]>(null);

  setElection(elec: Election) {
    this._election.next(elec);
  }

  get election() {
    return this._election.asObservable();
  }

  get $elections() {
    return this._elections.asObservable();
  }

  /////////////////////// ELECTION START HERE /////////////////////////

  /** Get single election */
  getElection(elec: string): Observable<Election> {
    return this.http
      .get<Election>(`/api/v1/elections/${elec}`)
      .pipe(tap(el => this._election.next(el)));
  }

  /** Get elections */
  getElections(): Observable<Election[]> {
    return this.http
      .get<Election[]>(`/api/v1/elections/`)
      .pipe(tap(e => this._elections.next(e)));
  }

  /** Create new election */
  createElection(elec: Election): Observable<Election | boolean> {
    return this.http
      .post<Election>('/api/v1/elections/', elec)
      .pipe(tap(_ => this.getElections().subscribe()));
  }

  /** Update election */
  updateElection(elec: string, update: any): Observable<Election | boolean> {
    return this.http
      .put<Election>(`/api/v1/elections/${elec}`, update)
      .pipe(tap(_ => this.getElections().subscribe()));
  }

  /** Delete election */
  deleteElection(elec: string): Observable<Election | boolean> {
    return this.http
      .delete<Election>(`/api/v1/elections/${elec}`)
      .pipe(tap(_ => this.getElections().subscribe()));
  }

  /////////////////////// ELECTION ENDS HERE /////////////////////////
}
