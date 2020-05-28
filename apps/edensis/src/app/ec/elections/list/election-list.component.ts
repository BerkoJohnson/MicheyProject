import { OnInit, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import IElection from '../../../models/election.model';
import { selectElection } from '../../../store/actions/election.actions';
import { selectElections } from '../../../store/reducers';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'elections-list',
  templateUrl: './election-list.component.html',
  styleUrls: ['./election-list.component.scss']
})
export class ElectionListComponent implements OnInit {
  elections$: Observable<IElection[]>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.loadElections();
  }

  loadElections() {
    this.elections$ = this.store.select(selectElections);
  }

  setCurrentElection(election: string) {
    this.store.dispatch(selectElection({ id: election }));
  }
}
