import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { VotingElection } from '../interfaces/votingElection.interface';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  private _votingElection = new BehaviorSubject<VotingElection>(null);
  public votingPayload$ = this._votingElection.asObservable();
  public payload$ = this.socket.fromEvent<VotingElection>('election');

  constructor(private http: HttpClient, private socket: Socket) {
    this.getLastElection().subscribe();
  }

  getLastElection(): Observable<VotingElection> {
    return this.http
      .get<VotingElection>('/api/v1/elections/last')
      .pipe(tap(ve => this._votingElection.next(ve)));
  }

  vote() {}
}
