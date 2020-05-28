import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import IVoter from '../models/voter.model';
import Votes from '../models/Votes.model';

@Injectable({
  providedIn: 'root'
})
export class VoterService {
  constructor(private http: HttpClient) {}

  /** Get single voter */
  getOne(voter: string): Observable<IVoter> {
    return this.http.get<IVoter>(`/api/v1/voters/${voter}`);
  }

  /** Create one voter */
  createOne(voter: IVoter, election: string): Observable<IVoter> {
    return this.http.post<IVoter>(`/api/v1/voters?election=${election}`, voter);
  }

  /** Update One */
  updateOne(voterId: string, update: Partial<IVoter>): Observable<IVoter> {
    return this.http.patch<IVoter>(`/api/v1/voters/${voterId}`, update);
  }

  /** Delete One */
  deleteOne(voterId: string): Observable<IVoter> {
    return this.http.delete<IVoter>(`/api/v1/voters/${voterId}`);
  }

  /** Create many voters */
  createMany(voters: IVoter[], election: string): Observable<IVoter[]> {
    return this.http.post<IVoter[]>(`/api/v1/voters?election=${election}`, {
      voters
    });
  }

  /** Get many voters */
  getMany(election: string, room: string): Observable<IVoter[]> {
    return this.http.get<IVoter[]>(
      `/api/v1/voters?room=${room}&election=${election}`
    );
  }

  /** Update many voters */
  updateMany(ids: string[], voters: Partial<IVoter>[]): Observable<IVoter[]> {
    return this.http.patch<IVoter[]>(
      `/api/v1/voters?ids=${ids.join(',')}`,
      voters
    );
  }

  /** Delete Many */
  deleteMany(ids: string[]): Observable<IVoter[]> {
    return this.http.delete<IVoter[]>(`/api/v1/voters?ids=${ids.join(',')}`);
  }

  /** Vote */
  vote(voterId: string, votes: Votes[]): Observable<IVoter> {
    return this.http.put<IVoter>(`/api/v1/voters/${voterId}`, votes);
  }
}
