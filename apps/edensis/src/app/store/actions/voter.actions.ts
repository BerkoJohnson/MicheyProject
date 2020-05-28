import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import IVoter from '../../models/voter.model';

/// Load List of Voters
export const loadVoters = createAction(
  '[Voter List Component] Load Voters',
  props<{ election: string; room: string }>()
);
export const loadVotersSuccess = createAction(
  '[Voter List Effect] Load Voters Success',
  props<{ voters: IVoter[] }>()
);
export const loadVotersFailure = createAction(
  '[Voter List Voters Effect] Load Voters Failure',
  props<{ error: any }>()
);

/// Load Individual Voter
export const selectVoter = createAction(
  '[Voter View Voter] Load Voter',
  props<{ id: string }>()
);

/// Add new Voter
export const addVoter = createAction(
  '[Voter New Voter] Add Voter',
  props<{ voter: IVoter }>()
);

export const addVoterSuccess = createAction(
  '[Effect New Voter] Add Voter Success',
  props<{ voter: IVoter }>()
);

export const addVoterFailure = createAction(
  '[Effect New Voter] Add Voter Failure',
  props<{ error: any }>()
);

/**Add Many Voters */
export const addMany = createAction(
  '[Voter New Voter] Add Voters',
  props<{ voters: IVoter[]; election: string }>()
);

export const addManySuccess = createAction(
  '[Effect New Voter] Add Many Voter Success',
  props<{ voters: IVoter[] }>()
);

export const addManyFailure = createAction(
  '[Effect New Voter] Add Many Voter Failure',
  props<{ error: any }>()
);

/** Update One Voter */
export const updateVoter = createAction(
  '[Effect Voter] Update Voter',
  props<{ payload: { id: string; changes: FormData } }>()
);

export const updateVoterFailure = createAction(
  '[Voter Update Effects] Update Voter Failure',
  props<{ error: any }>()
);

/** Delete One */
export const deleteVoter = createAction(
  '[Voter Remove Component] Delete Voter',
  props<{ id: string }>()
);

export const deleteVoterSuccess = createAction(
  '[Voter Remove Effect] Delete Voter Success',
  props<{ id: string }>()
);

export const deleteVoterFailure = createAction(
  '[Voter API] Delete Voter',
  props<{ error: any }>()
);

/** Delete Many */
export const deleteMany = createAction(
  '[Voter Remove Component] Delete Voter',
  props<{ ids: string[] }>()
);

export const deleteManySuccess = createAction(
  '[Voter Remove Effect] Delete Voter Success',
  props<{ ids: string[] }>()
);

export const deleteManyFailure = createAction(
  '[Voter API] Delete Voter',
  props<{ error: any }>()
);

/** Clear Voters */
export const clearVoters = createAction('[Voter API] Clear Voters');
