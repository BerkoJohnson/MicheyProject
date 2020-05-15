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
export const loadElection = createAction(
  '[Election View Election] Load Election',
  props<{ id: string }>()
);

export const loadElectionSuccess = createAction(
  '[Election View Election] Load Election Success',
  props<{ selectedElection: IElection }>()
);

export const loadElectionFailure = createAction(
  '[Election View Election] Load Election Failure',
  props<{ error: any }>()
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

export const addPosition = createAction(
  '[Election New Position] Add Position',
  props<{ position: IPosition }>()
);

export const addPositionSuccess = createAction(
  '[Election New Effect] Add Position Success',
  props<{ position: IPosition }>()
);

export const addPositionFailure = createAction(
  '[Election New Effect] Add Position Failure',
  props<{ error: any }>()
);

// Candidate Actions
export const addCandidate = createAction(
  '[Election New Candidate] Add Candidate',
  props<{ candidate: FormData }>()
);

export const addCandidateSuccess = createAction(
  '[Election New Candidate Effect] Add Candidate Success',
  props<{ candidate: ICandidate }>()
);

export const addCandidateFailure = createAction(
  '[Election New Candidate Effect] Add Candidate Failure',
  props<{ error: any }>()
);

// Set Current Election
export const setCurrentElection = createAction(
  '[Election List Componet] Set current election',
  props<{ election: IElection }>()
);

// Set Current Position
export const setCurrentPosition = createAction(
  '[List Position Component] Set current position',
  props<{ position: IPosition }>()
);

/// Load Candidate
export const loadCandidate = createAction(
  '[Candidate View] Load Candidate',
  props<{ candidate: string }>()
);

export const loadCandidateSuccess = createAction(
  '[Candidate View Effect] Load Candidate Success',
  props<{ candidate: ICandidate }>()
);

export const loadCandidateFailure = createAction(
  '[Candidate View Effect] Load Candidate Failure',
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
  '[Election/API] Update Election',
  props<{ election: Update<IElection> }>()
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
