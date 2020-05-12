import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElectionService } from './election.service';
import IPosition from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(private http: HttpClient) {}

  /** Get single position */
  getPosition(position: string): Observable<IPosition> {
    return this.http.get<IPosition>(`/api/v1/positions/${position}`);
  }

  /** Get positions */
  getPositions(election: string): Observable<IPosition[]> {
    return this.http.get<IPosition[]>(`/api/v1/positions?election=${election}`);
  }

  /** Create new position */
  createPosition(position: IPosition): Observable<IPosition> {
    return this.http.post<IPosition>(
      `/api/v1/positions?election=${position.election}`,
      position
    );
  }

  /** Update position */
  updatePosition(position: string, update: any): Observable<IPosition> {
    return this.http.put<IPosition>(`/api/v1/positions/${position}`, update);
  }

  /** Delete position */
  deletePosition(position: string): Observable<IPosition> {
    return this.http.delete<IPosition>(`/api/v1/positions/${position}`);
  }
}
