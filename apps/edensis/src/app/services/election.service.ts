import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Election } from '../interfaces';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BROWSER_STORAGE } from '../interfaces/storage';
import IElection from '../models/election.model';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  constructor(private http: HttpClient) {
    this.getElections().subscribe();
  }

  // tslint:disable-next-line:variable-name
  _election = new BehaviorSubject<Election>(null);
  election$ = this._election.asObservable();
  // tslint:disable-next-line:variable-name
  private _elections = new BehaviorSubject<Election[]>(null);
  elections$ = this._elections.asObservable();

  setElection(elec: Election) {
    this._election.next(elec);
  }

  /////////////////////// ELECTION START HERE /////////////////////////

  /** Get single election */
  getElection(elec: string): Observable<IElection> {
    return this.http
      .get<IElection>(`/api/v1/elections/${elec}`)
      .pipe(tap(el => this._election.next(el)));
  }

  /** Get elections */
  getElections(): Observable<IElection[]> {
    return this.http.get<IElection[]>(`/api/v1/elections/`);
  }

  /** Create new election */
  createElection(elec: IElection): Observable<IElection> {
    return this.http.post<IElection>('/api/v1/elections/', elec);
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
