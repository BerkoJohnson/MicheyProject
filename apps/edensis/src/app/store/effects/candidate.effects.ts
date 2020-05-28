import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromCandidates from '../actions/candidate.actions';
import * as fromPositions from '../actions/position.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { CandidateService } from '../../services';
import { of } from 'rxjs';

@Injectable()
export class CandidateEffects {
  createCandidate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCandidates.addCandidate),
      mergeMap(action =>
        this.service.createCandidate(action.candidate).pipe(
          map(candidate => {
            return fromPositions.loadPositions({
              election: candidate.election
            });
          }),
          catchError(error => of(fromCandidates.addCandidateFailure({ error })))
        )
      )
    )
  );

  updateCandidate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCandidates.updateCandidate),
      mergeMap(action =>
        this.service
          .updateCandidate(action.payload.id, action.payload.changes)
          .pipe(
            map(candidate => {
              return fromPositions.loadPositions({
                election: candidate.election
              });
            }),
            catchError(error =>
              of(fromCandidates.updateCandidateFailure({ error }))
            )
          )
      )
    )
  );

  deleteCandidate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCandidates.deleteCandidate),
      mergeMap(action =>
        this.service.deleteCandidate(action.id).pipe(
          map(candidate =>
            fromPositions.loadPositions({ election: candidate.election })
          ),
          catchError(error =>
            of(fromCandidates.deleteCandidateFailure({ error }))
          )
        )
      )
    )
  );

  loadCandidates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCandidates.loadCandidates),
      mergeMap(action =>
        this.service.getCandidates(action.position).pipe(
          map(candidates =>
            fromCandidates.loadCandidatesSuccess({ candidates })
          ),
          catchError(error =>
            of(fromCandidates.loadCandidatesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: CandidateService) {}
}
