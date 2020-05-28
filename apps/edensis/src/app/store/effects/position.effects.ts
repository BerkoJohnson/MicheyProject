import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromPositions from '../actions/position.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { PositionService } from '../../services';
import { of } from 'rxjs';

@Injectable()
export class PositionEffects {
  createPosition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPositions.addPosition),
      mergeMap(action =>
        this.positionService.createPosition(action.position).pipe(
          map(position => fromPositions.addPositionSuccess({ position })),
          catchError(error => of(fromPositions.addPositionFailure({ error })))
        )
      )
    )
  );

  loadPositions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPositions.loadPositions),
      mergeMap(action =>
        this.positionService.getPositions(action.election).pipe(
          map(positions => fromPositions.loadPositionsSuccess({ positions })),
          catchError(error => of(fromPositions.loadPositionsFailure({ error })))
        )
      )
    )
  );

  updatePosition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPositions.updatePosition),
      mergeMap(action =>
        this.positionService
          .updatePosition(action.position.changes._id, action.position.changes)
          .pipe(
            map(position =>
              fromPositions.updatePositionSuccess({ position: action.position })
            ),
            catchError(error =>
              of(fromPositions.updatePositionFailure({ error }))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private positionService: PositionService
  ) {}
}
