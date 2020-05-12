import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Election } from '../../../interfaces';
import { ElectionState } from '../../store/election.reducer';
import { Store } from '@ngrx/store';
import { loadElection } from '../../store/election.actions';
import { ActivatedRoute } from '@angular/router';
import { selectedElection } from '../../store/election.selector';
import IElection from '../../../models/election.model';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'view-election',
  templateUrl: './election-view.component.html',
  styleUrls: ['./election-view.component.scss']
})
export class ViewElectionComponent implements OnInit {
  currentElection$: Observable<IElection>;
  @Output() addNewElection = new EventEmitter<void>();

  constructor(
    private store: Store<ElectionState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.store.dispatch(loadElection({ id: p['id'] }));
    });
    this.loadElection();
  }

  loadElection() {
    this.currentElection$ = this.store.select(selectedElection);
  }
}
