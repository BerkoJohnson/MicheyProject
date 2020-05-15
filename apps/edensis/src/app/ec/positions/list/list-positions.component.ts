import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import IElection from '../../../models/election.model';
import { Store } from '@ngrx/store';
import { ElectionState } from '../../store/election.reducer';
import { selectedElection } from '../../store/election.selector';
import {
  loadCandidate,
  setCurrentPosition
} from '../../store/election.actions';
import IPosition from '../../../models/position.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'list-positions',
  templateUrl: './list-positions.component.html',
  styleUrls: ['./list-positions.component.scss']
})
export class ListPositionsComponent implements OnInit {
  currentElection$: Observable<IElection>;

  constructor(private store: Store<ElectionState>) {}
  ngOnInit() {
    this.currentElection$ = this.store.select(selectedElection);
  }

  // loadCandidate(id: string) {
  //   this.store.dispatch(loadCandidate({ candidate: id }));
  // }

  setCurrentPosition(pos: IPosition) {
    this.store.dispatch(setCurrentPosition({ position: pos }));
  }
}
