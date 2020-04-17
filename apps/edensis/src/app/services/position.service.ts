import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Position } from '../interfaces/all';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { BROWSER_STORAGE } from '../interfaces/storage';
import { ElectionService } from './election.service';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(private http: HttpClient, private elecSrvice: ElectionService) {
    this.elecSrvice.election.subscribe(e => {
      this.getPositions(e._id).subscribe();
    });
  }

  /** Get single position */
  getPosition(position: string, election: string): Observable<Position> {
    return this.http.get<Position>(`/api/v1/positions/${position}`);
  }

  /** Get positions */
  getPositions(election: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/v1/positions?election=${election}`);
  }

  /** Create new position */
  createPosition(position: Position, election: string): Observable<Position> {
    return this.http.post<Position>(
      `/api/v1/positions?election=${election}`,
      position
    );
  }

  /** Update position */
  updatePosition(position: string, update: any): Observable<Position> {
    return this.http.put<Position>(`/api/v1/positions/${position}`, update);
  }

  /** Delete position */
  deletePosition(position: string): Observable<Position> {
    return this.http.delete<Position>(`/api/v1/positions/${position}`);
  }
}
