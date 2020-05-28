import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import ICandidate from '../../../models/candidate.model';
import {
  getSelectedCandidate,
  getSelectedElectionID
} from '../../../store/reducers';
import { Observable } from 'rxjs';
import { deleteCandidate } from '../../../store/actions/candidate.actions';
import { Router } from '@angular/router';
import { loadPositions } from '../../../store/actions/position.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'remove-candidate',
  templateUrl: './remove-candidate.component.html',
  styleUrls: ['./remove-candidate.component.scss']
})
export class RemoveCandidateComponent implements OnInit {
  confirm: boolean;
  candidate: ICandidate;
  currentElection: string;

  constructor(private store: Store<any>, private router: Router) {}

  ngOnInit() {
    this.store
      .select(getSelectedCandidate)
      .subscribe(c => (this.candidate = c));

    this.store
      .select(getSelectedElectionID)
      .subscribe(x => (this.currentElection = x));
  }

  goBack() {
    setTimeout(
      () =>
        this.router.navigate([
          'ec',
          'elections',
          this.currentElection,
          'view-position'
        ]),
      100
    );
  }

  respond(answer: boolean, id: string) {
    if (!answer) {
      this.goBack();
    } else {
      this.store.dispatch(deleteCandidate({ id: id }));
      this.goBack();

      this.store.dispatch(loadPositions({ election: this.currentElection }));
    }
  }
}
