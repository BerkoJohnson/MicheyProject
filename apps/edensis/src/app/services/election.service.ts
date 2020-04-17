import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Election,
  Position,
  ElectionPayload,
  PositionPayload,
  ElectionsPayload,
  PositionsPayload,
  Candidate,
  CandidatePayload,
  CandidatesPayload
} from '../interfaces/all';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BROWSER_STORAGE } from '../interfaces/storage';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {
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

  /** Get single position */
  getPosition(position: string, election: string): Observable<PositionPayload> {
    return this.http.get<PositionPayload>(`/api/v1/positions/${position}`);
  }

  /** Get positions */
  getPositions(election: string): Observable<PositionsPayload> {
    return this.http.get<PositionsPayload>(
      `/api/v1/positions?election=${election}`
    );
  }

  /** Create new position */
  createPosition(
    position: Position,
    election: string
  ): Observable<PositionPayload> {
    return this.http
      .post<PositionPayload>(`/api/v1/positions/`, position)
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /** Update position */
  updatePosition(
    position: string,
    election: string,
    update: any
  ): Observable<PositionPayload> {
    return this.http
      .put<PositionPayload>(`/api/v1/positions/${position}`, update)
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /** Delete position */
  deletePosition(
    position: string,
    election: string
  ): Observable<PositionPayload> {
    return this.http
      .delete<PositionPayload>(`/api/v1/positions/${position}`)
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /////////////////////// POSITION ENDS HERE /////////////////////////

  /** Candidates */

  /** Get single candidate */
  getCandidate(candidate: string): Observable<CandidatePayload> {
    return this.http.get<CandidatePayload>(`/api/v1/candidates/${candidate}`);
  }

  fetchCandidatesForThisElection(election: string) {
    return this.http.get<Candidate[]>(
      `/api/v1/candidates/fetch?election=${election}`
    );
  }

  /** Get candidates */
  getCandidates(position: string): Observable<CandidatesPayload> {
    return this.http.get<CandidatesPayload>(
      `/api/v1/candidates?position=${position}`
    );
  }

  /** Create new candidate */
  createCandidate(
    candidate: FormData,
    position: string,
    election: string
  ): Observable<CandidatePayload> {
    return this.http
      .post<CandidatePayload>(
        `/api/v1/candidates?position=${position}`,
        candidate
      )
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /** Update candidate */
  updateCandidate(
    candidate: string,
    election: string,
    update: any
  ): Observable<CandidatePayload> {
    return this.http
      .put<CandidatePayload>(`/api/v1/candidates/${candidate}`, update)
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /** Delete candidate */
  deleteCandidate(
    candidate: string,
    election: string
  ): Observable<CandidatePayload> {
    return this.http
      .delete<CandidatePayload>(`/api/v1/candidates/${candidate}`)
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }
}
