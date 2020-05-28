import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import ICandidate from '../../../models/candidate.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import IElection from '../../../models/election.model';
import { getSelectedElection } from '../../../store/reducers';
import { selectCandidate } from '../../../store/actions/candidate.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'view-candidate',
  templateUrl: './candidate-view.compnonent.html',
  styleUrls: ['./candidate-view.compnonent.scss']
})
export class ViewCandidateComponent implements OnInit {
  @Input() candidate: ICandidate;
  // currentCandidate$: Observable<ICandidate>;
  currentElection$: Observable<IElection>;

  constructor(private store: Store<any>, private router: Router) {}

  ngOnInit() {
    this.currentElection$ = this.store.select(getSelectedElection);
  }

  createImageLink(photo: string) {
    return `data:image/jpg;base64,${photo}`;
  }

  setCurrentCandidate(candidate: string) {
    this.store.dispatch(selectCandidate({ id: candidate }));
  }

  goto(candidate: string, link: string) {
    this.store.dispatch(selectCandidate({ id: candidate }));
    setTimeout(() => {
      let url = '/ec/elections/';
      this.currentElection$.subscribe(el => (url += el._id));
      url += link;

      this.router.navigateByUrl(url);
    }, 100);
  }
}
