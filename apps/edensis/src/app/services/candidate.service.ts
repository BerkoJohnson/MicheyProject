import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import ICandidate from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  constructor(private http: HttpClient) {}

  /** Get single candidate */
  getCandidate(candidate: string): Observable<ICandidate> {
    return this.http.get<ICandidate>(`/api/v1/candidates/${candidate}`);
  }

  /** Get candidates */
  getCandidates(position: string): Observable<ICandidate[]> {
    return this.http.get<ICandidate[]>(
      `/api/v1/candidates?position=${position}`
    );
  }

  getCandidatesByElec(e: string): Observable<ICandidate[]> {
    return this.http.get<ICandidate[]>(
      `/api/v1/candidates/byelec?election=${e}`
    );
  }

  /** Create new candidate */
  createCandidate(candidate: FormData): Observable<ICandidate> {
    return this.http.post<ICandidate>(`/api/v1/candidates`, candidate);
  }

  /** Update candidate */
  updateCandidate(candidate: string, update: any): Observable<ICandidate> {
    return this.http.patch<ICandidate>(
      `/api/v1/candidates/${candidate}`,
      update
    );
  }

  /** Delete candidate */
  deleteCandidate(candidate: string): Observable<ICandidate> {
    return this.http.delete<ICandidate>(`/api/v1/candidates/${candidate}`);
  }
}
