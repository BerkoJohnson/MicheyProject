import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import ICandidate from '../../models/candidate.model';

/// Load List of Candidates
export const loadCandidates = createAction(
  '[Candidate List Component] Load Candidates',
  props<{ position: string }>()
);
export const loadCandidatesSuccess = createAction(
  '[Candidate List Effect] Load Candidates Success',
  props<{ candidates: ICandidate[] }>()
);
export const loadCandidatesFailure = createAction(
  '[Candidate List Candidates Effect] Load Candidates Failure',
  props<{ error: any }>()
);

/// Load Individual Candidate
export const selectCandidate = createAction(
  '[Candidate View Candidate] Load Candidate',
  props<{ id: string }>()
);

/// Add new Candidate
export const addCandidate = createAction(
  '[Candidate New Candidate] Add Candidate',
  props<{ candidate: FormData }>()
);

export const addCandidateSuccess = createAction(
  '[Effect New Candidate] Add Candidate Success',
  props<{ candidate: ICandidate }>()
);

export const addCandidateFailure = createAction(
  '[Effect New Candidate] Add Candidate Failure',
  props<{ error: any }>()
);

export const updateCandidate = createAction(
  '[Effect Candidate] Update Candidate',
  props<{ payload: { id: string; changes: FormData } }>()
);

export const updateCandidateFailure = createAction(
  '[Candidate Update Effects] Update Candidate Failure',
  props<{ error: any }>()
);

export const deleteCandidate = createAction(
  '[Candidate Remove Component] Delete Candidate',
  props<{ id: string }>()
);

export const deleteCandidateSuccess = createAction(
  '[Candidate Remove Effect] Delete Candidate Success',
  props<{ id: string }>()
);

export const deleteCandidateFailure = createAction(
  '[Candidate API] Delete Candidate',
  props<{ error: any }>()
);

export const clearCandidates = createAction('[Candidate API] Clear Candidates');
