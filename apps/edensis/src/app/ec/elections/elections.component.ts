import { Component, OnInit } from '@angular/core';
import { Election } from '../../interfaces';
import { ElectionService } from '../../services/election.service';
import IElection from '../../models/election.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ElectionState } from '../store/election.reducer';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {
  elections: Election[];
  currentElection$: Observable<IElection>;

  constructor(
    public electionSrv: ElectionService,
    private store: Store<ElectionState>
  ) {}

  ngOnInit(): void {}

  onViewElection(el: Election) {}

  onSubmitForm(elData: Election) {
    console.log(elData);
  }
}
