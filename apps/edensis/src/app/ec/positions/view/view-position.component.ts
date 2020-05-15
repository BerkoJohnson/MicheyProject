import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ElectionState } from '../../store/election.reducer';
import { Observable } from 'rxjs';
import IPosition from '../../../models/position.model';
import {
  CurrentPosition,
  selectedElection
} from '../../store/election.selector';
import IElection from '../../../models/election.model';
import { loadCandidate } from '../../store/election.actions';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'view-position',
  templateUrl: './view-position.component.html',
  styleUrls: ['./view-position.component.scss']
})
export class ViewPositionComponent implements OnInit {
  currentPosition$: Observable<IPosition>;
  currentElection$: Observable<IElection>;

  constructor(private store: Store<ElectionState>, private router: Router) {}
  ngOnInit() {
    this.currentPosition$ = this.store.select(CurrentPosition);
    this.currentElection$ = this.store.select(selectedElection);
  }

  createImageLink(photo: string) {
    return `data:image/jpg;base64,${photo}`;
  }

  setCurrentCandidate(candidate: string) {
    this.store.dispatch(loadCandidate({ candidate }));
  }

  goto(candidate: string, link: string) {
    this.store.dispatch(loadCandidate({ candidate }));
    setTimeout(() => {
      let url = '/ec/elections/';
      this.currentElection$.subscribe(el => (url += el._id));
      url += link;

      this.router.navigateByUrl(url);
    }, 100);
  }
}
