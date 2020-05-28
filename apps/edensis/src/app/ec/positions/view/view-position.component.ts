import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import IPosition from '../../../models/position.model';
import IElection from '../../../models/election.model';
import { Router } from '@angular/router';
import {
  getSelectedPosition,
  getSelectedElection,
  getSelectedPositionID,
  selectPositions
} from '../../../store/reducers';
import ICandidate from '../../../models/candidate.model';
import { loadCandidates } from '../../../store/actions/candidate.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'view-position',
  templateUrl: './view-position.component.html',
  styleUrls: ['./view-position.component.scss']
})
export class ViewPositionComponent implements OnInit {
  currentPosition: IPosition;
  currentElection$: Observable<IElection>;
  positions$: Observable<IPosition[]>;

  constructor(private store: Store<any>, private router: Router) {}
  ngOnInit() {
    this.currentElection$ = this.store.select(getSelectedElection);
    this.store
      .select(getSelectedPosition)
      .subscribe(x => (this.currentPosition = x));
    this.store.dispatch(loadCandidates({ position: this.currentPosition._id }));
  }

  createImageLink(photo: string) {
    return `data:image/jpg;base64,${photo}`;
  }

  setCurrentCandidate(candidate: string) {
    // this.store.dispatch(loadCandidate({ candidate }));
  }

  goto(candidate: string, link: string) {
    // this.store.dispatch(loadCandidate({ candidate }));
    setTimeout(() => {
      let url = '/ec/elections/';
      this.currentElection$.subscribe(el => (url += el._id));
      url += link;

      this.router.navigateByUrl(url);
    }, 100);
  }
}
