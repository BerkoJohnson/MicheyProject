import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ElectionEffects } from './election.effects';

describe('ElectionEffects', () => {
  let actions$: Observable<any>;
  let effects: ElectionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ElectionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ElectionEffects>(ElectionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
