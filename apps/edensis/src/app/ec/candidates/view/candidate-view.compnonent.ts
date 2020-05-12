import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import ICandidate from '../../../models/candidate.model';
import { Store } from '@ngrx/store';
import { ElectionState } from '../../store/election.reducer';
import { loadCandidate } from '../../store/election.actions';
import {
  CurrentCandidate,
  selectedElection
} from '../../store/election.selector';
import { ActivatedRoute } from '@angular/router';
import IElection from '../../../models/election.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'view-candidate',
  templateUrl: './candidate-view.compnonent.html',
  styleUrls: ['./candidate-view.compnonent.scss']
})
export class ViewCandidateComponent implements OnInit {
  currentCandidate$: Observable<ICandidate>;
  currentElection$: Observable<IElection>;
  constructor(
    private store: Store<ElectionState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p =>
      this.store.dispatch(loadCandidate({ candidate: p['cid'] }))
    );

    this.currentCandidate$ = this.store.select(CurrentCandidate);
    this.currentElection$ = this.store.select(selectedElection);
  }

  createImageLink(photo: string) {
    return `data:image/jpg;base64,${photo}`;
  }
}
