import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import IPosition from '../../models/position.model';
import IElection from '../../models/election.model';

/// Load List of Positions
export const loadPositions = createAction(
  '[Position List Component] Load Positions',
  props<{ election: string }>()
);
export const loadPositionsSuccess = createAction(
  '[Position List Effect] Load Positions Success',
  props<{ positions: IPosition[] }>()
);
export const loadPositionsFailure = createAction(
  '[Position List Positions Effect] Load Positions Failure',
  props<{ error: any }>()
);

/// Load Individual Position
export const selectPosition = createAction(
  '[Position View] Set Current Position',
  props<{ id: string }>()
);

/// Add new position
export const addPosition = createAction(
  '[Position New Position] Add Position',
  props<{ position: IPosition }>()
);

export const addPositionSuccess = createAction(
  '[Effect New Position] Add Position Success',
  props<{ position: IPosition }>()
);

export const addPositionFailure = createAction(
  '[Effect New Position] Add Position Failure',
  props<{ error: any }>()
);

export const ADDNEWCANDIDATE = createAction(
  '[New Candidate] Assign New Candidate to Position',
  props<{ candidate: string }>()
);

export const updatePosition = createAction(
  '[Effect Position] Update Position',
  props<{ position: Update<IPosition> }>()
);

export const updatePositionSuccess = createAction(
  '[Position/API] Update Position',
  props<{ position: Update<IPosition> }>()
);

export const updatePositionFailure = createAction(
  '[Position/API] Update Position',
  props<{ error: any }>()
);

export const deletePosition = createAction(
  '[Position API] Delete Position',
  props<{ id: string }>()
);

export const clearPositions = createAction('[Position API] Clear Positions');
