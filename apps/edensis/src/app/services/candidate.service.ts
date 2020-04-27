import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Candidate } from '../interfaces';
import { tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ElectionService } from './election.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private _candidate = new BehaviorSubject<Candidate>(null);
  private _candidates = new BehaviorSubject<Candidate[]>(null);

  candidate$ = this._candidate.asObservable();
  candidates$ = this._candidates.asObservable();
  currentElectionId: string;

  constructor(
    private http: HttpClient,
    private electionService: ElectionService
  ) {}

  /** Get single candidate */
  getCandidate(candidate: string): Observable<Candidate> {
    return this.http.get<Candidate>(`/api/v1/candidates/${candidate}`);
  }

  /** Get candidates */
  getCandidates(position: string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(
      `/api/v1/candidates?position=${position}`
    );
  }

  private getCandidatesByElec(e: string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(
      `/api/v1/candidates/byelec?election=${e}`
    );
  }

  loadCandidates() {
    this.electionService.election$
      .pipe(
        switchMap(v => {
          if (v === null || v === undefined) return;
          return this.getCandidatesByElec(v._id);
        })
      )
      .subscribe(cs => {
        this._candidates.next(cs);
      });
  }

  /** Create new candidate */
  createCandidate(
    candidate: FormData,
    position: string
  ): Observable<Candidate> {
    return this.http
      .post<Candidate>(`/api/v1/candidates?position=${position}`, candidate)
      .pipe(tap(c => this.loadCandidates()));
  }

  /** Update candidate */
  updateCandidate(candidate: string, update: any): Observable<Candidate> {
    return this.http
      .patch<Candidate>(`/api/v1/candidates/${candidate}`, update)
      .pipe(tap(c => this.loadCandidates()));
  }

  /** Delete candidate */
  deleteCandidate(candidate: string): Observable<Candidate> {
    return this.http
      .delete<Candidate>(`/api/v1/candidates/${candidate}`)
      .pipe(tap(c => this.loadCandidates()));
  }
}
