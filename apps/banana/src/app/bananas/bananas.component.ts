import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, getMyBanana } from '../app.state';
import { Observable } from 'rxjs';
import { GetNewBanana } from '../state';

@Component({
  selector: 'my-web-space-bananas',
  templateUrl: './bananas.component.html',
  styleUrls: ['./bananas.component.scss']
})
export class BananasComponent implements OnInit {
  banana$: Observable<any>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.banana$ = this.store.dispatch(select(getMyBanana));
  }

  newBanana() {
    this.store.dispatch(new GetNewBanana(null));
  }
}
