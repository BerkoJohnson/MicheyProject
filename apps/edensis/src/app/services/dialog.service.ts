import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  confirm(message: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Are you sure?');
    return of(confirmation);
  }
}
