import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../interfaces/all';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CandidateService {
  constructor(private http: HttpClient) {}

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

  /** Create new candidate */
  createCandidate(
    candidate: FormData,
    position: string
  ): Observable<Candidate> {
    return this.http.post<Candidate>(
      `/api/v1/candidates?position=${position}`,
      candidate
    );
  }

  /** Update candidate */
  updateCandidate(candidate: string, update: any): Observable<Candidate> {
    return this.http.put<Candidate>(`/api/v1/candidates/${candidate}`, update);
  }

  /** Delete candidate */
  deleteCandidate(candidate: string): Observable<Candidate> {
    return this.http.delete<Candidate>(`/api/v1/candidates/${candidate}`);
  }
}
