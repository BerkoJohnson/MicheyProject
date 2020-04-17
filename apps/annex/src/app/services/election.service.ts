import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

import { BROWSER_STORAGE } from "../interfaces/storage";
import { Election, Candidate, Position } from '../interfaces';

@Injectable({
  providedIn: "root"
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
      .post<Election>("/api/v1/elections/", elec)
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
  getPosition(position: string, election: string): Observable<Position> {
    return this.http.get<Position>(
      `/api/v1/elections/${election}/positions/${position}`
    );
  }

  /** Get positions */
  getPositions(election: string): Observable<Position> {
    return this.http.get<Position>(
      `/api/v1/elections/${election}/positions/`
    );
  }

  /** Create new position */
  createPosition(
    position: Position,
    election: string
  ): Observable<Position> {
    return this.http
      .post<Position>(
        `/api/v1/elections/${election}/positions/`,
        position
      )
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /** Update position */
  updatePosition(
    position: string,
    election: string,
    update: any
  ): Observable<Position> {
    return this.http
      .put<Position>(
        `/api/v1/elections/${election}/positions/${position}`,
        update
      )
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /** Delete position */
  deletePosition(
    position: string,
    election: string
  ): Observable<Position> {
    return this.http
      .delete<Position>(
        `/api/v1/elections/${election}/positions/${position}`
      )
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /////////////////////// POSITION ENDS HERE /////////////////////////

  /** Candidates */

  /** Get single candidate */
  getCandidate(
    candidate: string,
    position: string,
    election: string
  ): Observable<Candidate> {
    return this.http.get<Candidate>(
      `/api/v1/elections/${election}/positions/${position}/candidates/${candidate}`
    );
  }

  /** Get candidates */
  getCandidates(
    position: string,
    election: string
  ): Observable<Candidate> {
    return this.http.get<Candidate>(
      `/api/v1/elections/${election}/positions/${position}/candidates/`
    );
  }

  /** Create new candidate */
  createCandidate(
    candidate: FormData,
    position: string,
    election: string
  ): Observable<Candidate> {
    return this.http
      .post<Candidate>(
        `/api/v1/elections/${election}/positions/${position}/candidates/`,
        candidate
      )
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /** Update candidate */
  updateCandidate(
    candidate: string,
    position: string,
    election: string,
    update: any
  ): Observable<Candidate> {
    return this.http
      .put<Candidate>(
        `/api/v1/elections/${election}/positions/${position}/candidates/${candidate}`,
        update
      )
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }

  /** Delete candidate */
  deleteCandidate(
    candidate: string,
    position: string,
    election: string
  ): Observable<Candidate> {
    return this.http
      .delete<Candidate>(
        `/api/v1/elections/${election}/positions/${position}/candidates/${candidate}`
      )
      .pipe(tap(_ => this.getElection(election).subscribe()));
  }
}
