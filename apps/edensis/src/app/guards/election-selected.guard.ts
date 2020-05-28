import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getSelectedElectionID } from '../store/reducers';

@Injectable({
  providedIn: 'root'
})
export class ElectionSelectedGuard implements CanActivate {
  returnValue = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store.select(getSelectedElectionID).subscribe(x => {
      if (x) this.returnValue = true;
    });

    if (this.returnValue !== true) {
      this.router.navigateByUrl('/ec/elections');
    }

    return this.returnValue;
  }

  constructor(private store: Store<any>, private router: Router) {}
}
