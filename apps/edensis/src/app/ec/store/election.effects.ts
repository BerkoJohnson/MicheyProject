import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromElections from './election.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import {
  ElectionService,
  PositionService,
  CandidateService
} from '../../services';
import { of } from 'rxjs';

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

  createPosition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromElections.addPosition),
      mergeMap(action =>
        this.positionService.createPosition(action.position).pipe(
          map(position => fromElections.addPositionSuccess({ position })),
          catchError(error => of(fromElections.addPositionFailure({ error })))
        )
      )
    )
  );

  createCandidate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromElections.addCandidate),
      mergeMap(action =>
        this.candidateService.createCandidate(action.candidate).pipe(
          map(candidate => fromElections.addCandidateSuccess({ candidate })),
          catchError(error => of(fromElections.addCandidateFailure({ error })))
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

  loadElection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromElections.loadElection),
      mergeMap(action =>
        this.electionService.getElection(action.id).pipe(
          map(election =>
            fromElections.loadElectionSuccess({ selectedElection: election })
          ),
          catchError(error => of(fromElections.loadElectionFailure({ error })))
        )
      )
    )
  );

  loadCandidate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromElections.loadCandidate),
      mergeMap(action =>
        this.candidateService.getCandidate(action.candidate).pipe(
          map(candidate => fromElections.loadCandidateSuccess({ candidate })),
          catchError(error => of(fromElections.loadCandidateFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private electionService: ElectionService,
    private positionService: PositionService,
    private candidateService: CandidateService
  ) {}
}
