import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ElectionState,
  electionsFeatureKey,
  selectAll
} from './election.reducer';

export const selectElectionState = createFeatureSelector<ElectionState>(
  electionsFeatureKey
);

export const selectElections = createSelector(selectElectionState, selectAll);
export const selectedElection = createSelector(
  selectElectionState,
  (state: ElectionState) => state.selectedElection
);

export const CurrentElection = createSelector(
  selectElectionState,
  (state: ElectionState) => state.useElection
);

export const CurrentCandidate = createSelector(
  selectElectionState,
  (state: ElectionState) => state.currentCandidate
);

export const CurrentPosition = createSelector(
  selectElectionState,
  (state: ElectionState) => state.currentPosition
);
