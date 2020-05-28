import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromVoters from '../actions/voter.actions';
import * as fromPositions from '../actions/position.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { VoterService } from '../../services';
import { of } from 'rxjs';

@Injectable()
export class VotersEffects {
  createVoters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromVoters.addMany),
      mergeMap(action =>
        this.service.createMany(action.voters, action.election).pipe(
          map(voters => fromVoters.addManySuccess({ voters })),
          catchError(error => of(fromVoters.addManyFailure({ error })))
        )
      )
    )
  );

  // updateCandidate$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromCandidates.updateCandidate),
  //     mergeMap(action =>
  //       this.service
  //         .updateCandidate(action.payload.id, action.payload.changes)
  //         .pipe(
  //           map(candidate => {
  //             return fromPositions.loadPositions({
  //               election: candidate.election
  //             });
  //           }),
  //           catchError(error =>
  //             of(fromCandidates.updateCandidateFailure({ error }))
  //           )
  //         )
  //     )
  //   )
  // );

  deleteMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromVoters.deleteMany),
      mergeMap(action =>
        this.service.deleteMany(action.ids).pipe(
          map(() => fromVoters.deleteManySuccess({ ids: action.ids })),
          catchError(error => of(fromVoters.deleteManyFailure({ error })))
        )
      )
    )
  );

  loadVoters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromVoters.loadVoters),
      mergeMap(action =>
        this.service.getMany(action.election, action.room).pipe(
          map(voters => fromVoters.loadVotersSuccess({ voters })),
          catchError(error => of(fromVoters.loadVotersFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: VoterService) {}
}
