import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Position } from '../interfaces';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ElectionService } from './election.service';
import { tap, switchMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private _position = new BehaviorSubject<Position>(null);
  private _positions = new BehaviorSubject<Position[]>(null);

  position$ = this._position.asObservable();
  positions$ = this._positions.asObservable();
  currentElectionId: string;
  constructor(private http: HttpClient, private elecSrvice: ElectionService) {}

  loadPositions() {
    this.elecSrvice.election$
      .pipe(
        switchMap(v => {
          if (v === null || v === undefined) return;
          this.currentElectionId = v._id;
          return this.getPositions(v._id);
        })
      )
      .subscribe(ps => this._positions.next(ps));
  }

  /** Get single position */
  getPosition(position: string): Observable<Position> {
    return this.http.get<Position>(`/api/v1/positions/${position}`);
  }

  /** Get positions */
  getPositions(election: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/v1/positions?election=${election}`);
  }

  /** Create new position */
  createPosition(position: Position): Observable<Position> {
    return this.http
      .post<Position>(
        `/api/v1/positions?election=${this.currentElectionId}`,
        position
      )
      .pipe(tap(p => this.loadPositions()));
  }

  /** Update position */
  updatePosition(position: string, update: any): Observable<Position> {
    return this.http
      .put<Position>(`/api/v1/positions/${position}`, update)
      .pipe(tap(p => this.loadPositions()));
  }

  /** Delete position */
  deletePosition(position: string): Observable<Position> {
    return this.http.delete<Position>(`/api/v1/positions/${position}`).pipe(
      shareReplay(),
      tap(p => this.loadPositions())
    );
  }
}
