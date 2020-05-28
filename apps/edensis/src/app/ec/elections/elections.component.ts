import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadElections } from '../../store/actions/election.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(loadElections());
  }
}
