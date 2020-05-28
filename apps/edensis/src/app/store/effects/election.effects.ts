import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromElections from '../actions/election.actions';
import {
  mergeMap,
  map,
  catchError,
  exhaustMap,
  switchMap,
  concatMap
} from 'rxjs/operators';
import {
  ElectionService,
  PositionService,
  CandidateService
} from '../../services';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import IElection from '../../models/election.model';

@Injectable()
export class ElectionEffects {
  createElection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromElections.addElection),
      mergeMap(action =>
        this.electionService.createElection(action.election).pipe(
          map(election => fromElections.addElectionSuccess({ election })),
          catchError(error => of(fromElections.addElectionFailure({ error })))
        )
      )
    )
  );

  loadElections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromElections.loadElections),
      mergeMap(() =>
        this.electionService.getElections().pipe(
          map(elections => fromElections.loadElectionsSuccess({ elections })),
          catchError(error => of(fromElections.loadElectionsFailure({ error })))
        )
      )
    )
  );

  updateElection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromElections.updateElection),
      concatMap(action =>
        this.electionService.updateElection(action.id, action.update).pipe(
          map(election => {
            const updated: Update<IElection> = {
              id: action.id,
              changes: {
                ...action.update,
                updatedAt: election.updatedAt
              }
            };
            // console.log(updated);
            return fromElections.updateElectionSuccess({ election: updated });
          }),
          catchError(error =>
            of(fromElections.updateElectionFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private electionService: ElectionService
  ) {}
}
