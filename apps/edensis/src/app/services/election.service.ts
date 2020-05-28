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
  constructor(private http: HttpClient) {}
  /////////////////////// ELECTION START HERE /////////////////////////

  /** Get single election */
  getElection(elec: string): Observable<IElection> {
    return this.http.get<IElection>(`/api/v1/elections/${elec}`);
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
  updateElection(elec: string, update: any): Observable<IElection> {
    return this.http.put<IElection>(`/api/v1/elections/${elec}`, update);
  }

  /** Delete election */
  deleteElection(elec: string): Observable<IElection> {
    return this.http.delete<IElection>(`/api/v1/elections/${elec}`);
  }
}
