import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import ICandidate from '../../../models/candidate.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectCandidates,
  getSelectedPositionID
} from '../../../store/reducers';
import { loadCandidates } from '../../../store/actions/candidate.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'list-candidates',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.scss']
})
export class ListCandidateComponent implements OnInit {
  @Input() position: string;
  candidates$: Observable<ICandidate[]>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store
      .select(getSelectedPositionID)
      .subscribe(x => this.store.dispatch(loadCandidates({ position: x })));
    this.candidates$ = this.store.select(selectCandidates);
    // console.log(this.position);
  }
}
