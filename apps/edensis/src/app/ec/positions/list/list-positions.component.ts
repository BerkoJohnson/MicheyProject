import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import IElection from '../../../models/election.model';
import { Store } from '@ngrx/store';
import IPosition from '../../../models/position.model';
import {
  getSelectedElection,
  selectPositions,
  getSelectedElectionID
} from '../../../store/reducers';
import { switchMap, tap } from 'rxjs/operators';
import {
  loadPositions,
  selectPosition
} from '../../../store/actions/position.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'list-positions',
  templateUrl: './list-positions.component.html',
  styleUrls: ['./list-positions.component.scss']
})
export class ListPositionsComponent implements OnInit {
  positions$: Observable<IPosition[]>;
  currentELectionID: string;

  constructor(private store: Store<any>) {}
  ngOnInit() {
    this.store.select(getSelectedElectionID).subscribe(x => {
      this.currentELectionID = x;
      this.store.dispatch(loadPositions({ election: x }));
    });

    this.positions$ = this.store.select(selectPositions);
  }

  setCurrentPosition(pos: string) {
    this.store.dispatch(selectPosition({ id: pos }));
  }
}
