import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import ICandidate from '../../../models/candidate.model';
import { Store } from '@ngrx/store';
import { ElectionState } from '../../store/election.reducer';
import { loadCandidate } from '../../store/election.actions';
import { selectedElection } from '../../store/election.selector';
import { Router } from '@angular/router';
import IElection from '../../../models/election.model';

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
  constructor(private store: Store<ElectionState>, private router: Router) {}

  ngOnInit() {
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
