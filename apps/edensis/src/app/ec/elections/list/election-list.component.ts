import {
  OnInit,
  OnDestroy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Election } from '../../../interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import IElection from '../../../models/election.model';
import { ElectionState } from '../../store/election.reducer';
import {
  loadElections,
  setCurrentElection,
  loadElection
} from '../../store/election.actions';
import { selectElections } from '../../store/election.selector';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'elections-list',
  templateUrl: './election-list.component.html',
  styleUrls: ['./election-list.component.scss']
})
export class ElectionListComponent implements OnInit {
  elections$: Observable<IElection[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<ElectionState>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadElections());
    this.loadElections();
  }

  loadElections() {
    this.elections$ = this.store.select(selectElections);
  }

  useElection(election: IElection) {
    this.store.dispatch(setCurrentElection({ election }));
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (returnUrl === null || returnUrl === undefined) return;
    this.router.navigate([returnUrl], { relativeTo: this.route });
  }

  viewElection(el: string) {
    this.router.navigate([`${el}/view`], { relativeTo: this.route });
  }
}
