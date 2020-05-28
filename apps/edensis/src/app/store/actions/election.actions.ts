import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import IElection from '../../models/election.model';
import IPosition from '../../models/position.model';
import ICandidate from '../../models/candidate.model';

/// Load List of Elections
export const loadElections = createAction(
  '[Election List Component] Load Elections'
);
export const loadElectionsSuccess = createAction(
  '[Election List Effect] Load Elections Success',
  props<{ elections: IElection[] }>()
);
export const loadElectionsFailure = createAction(
  '[Election List Elections Effect] Load Elections Failure',
  props<{ error: any }>()
);

/// Load Individual Election
export const selectElection = createAction(
  '[Election View Election] Select Election',
  props<{ id: string }>()
);

/// Add new election
export const addElection = createAction(
  '[Election New Election] Add Election',
  props<{ election: IElection }>()
);

export const addElectionSuccess = createAction(
  '[Election New Effect] Add Election Success',
  props<{ election: IElection }>()
);

export const addElectionFailure = createAction(
  '[Election New Effect] Add Election Failure',
  props<{ error: any }>()
);

export const upsertElection = createAction(
  '[Election/API] Upsert Election',
  props<{ election: IElection }>()
);

export const upsertElections = createAction(
  '[Election/API] Upsert Elections',
  props<{ elections: IElection[] }>()
);

export const updateElection = createAction(
  '[Election Edit Component] Update Election',
  props<{ id: string; update: Partial<IElection> }>()
);

export const updateElectionSuccess = createAction(
  '[Election Effects] Update Election Success',
  props<{ election: Update<IElection> }>()
);
export const updateElectionFailure = createAction(
  '[Election Effects] Update Election Failure',
  props<{ error: any }>()
);

export const updateElections = createAction(
  '[Election/API] Update Elections',
  props<{ elections: Update<IElection>[] }>()
);

export const deleteElection = createAction(
  '[Election/API] Delete Election',
  props<{ id: string }>()
);

export const deleteElections = createAction(
  '[Election/API] Delete Elections',
  props<{ ids: string[] }>()
);

export const clearElections = createAction('[Election/API] Clear Elections');
