import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromElections from './election.reducer';
import * as fromPositions from './position.reducer';
import * as fromCandidates from './candidate.reducer';
import * as fromVoters from './voter.reducer';

export interface AppState {
  elections: fromElections.ElectionState;
  positions: fromPositions.PositionState;
  candidates: fromCandidates.CandidateState;
  voters: fromVoters.VoterState;
}

export const reducers: ActionReducerMap<AppState> = {
  elections: fromElections.reducer,
  positions: fromPositions.reducer,
  candidates: fromCandidates.reducer,
  voters: fromVoters.reducer
};

// Election Selectors
export const selectElectionState = createFeatureSelector<
  fromElections.ElectionState
>(fromElections.electionsFeatureKey);
export const selectElections = createSelector(
  selectElectionState,
  fromElections.selectAll
);
export const getSelectedElection = createSelector(
  selectElectionState,
  (state: fromElections.ElectionState) =>
    state.entities[state.selectedElectionID]
);

export const getSelectedElectionID = createSelector(
  selectElectionState,
  (state: fromElections.ElectionState) => state.selectedElectionID
);

// Position Selectors
export const selectPositionState = createFeatureSelector<
  fromPositions.PositionState
>(fromPositions.positionsFeatureKey);

export const selectPositions = createSelector(
  selectPositionState,
  fromPositions.selectAll
);

export const getSelectedPosition = createSelector(
  selectPositionState,
  // tslint:disable-next-line: no-shadowed-variable
  (state: fromPositions.PositionState) =>
    state.entities[state.selectedPositionID]
);
export const getSelectedPositionID = createSelector(
  selectPositionState,
  // tslint:disable-next-line: no-shadowed-variable
  (state: fromPositions.PositionState) => state.selectedPositionID
);

// Candidate Selectors
export const selectCandidateState = createFeatureSelector<
  fromCandidates.CandidateState
>(fromCandidates.candidateFeatureKey);

export const selectCandidates = createSelector(
  selectCandidateState,
  fromCandidates.selectAll
);

export const getSelectedCandidate = createSelector(
  selectCandidateState,
  // tslint:disable-next-line: no-shadowed-variable
  (state: fromCandidates.CandidateState) =>
    state.entities[state.selectedCandidateID]
);

export const getSelectedCandidateID = createSelector(
  selectCandidateState,
  // tslint:disable-next-line: no-shadowed-variable
  (state: fromCandidates.CandidateState) => state.selectedCandidateID
);

// Voter Selectors
export const selectVoterState = createFeatureSelector<fromVoters.VoterState>(
  fromVoters.voterFeatureKey
);

export const selectVoters = createSelector(
  selectVoterState,
  fromVoters.selectAll
);

export const getSelectedVoter = createSelector(
  selectVoterState,
  // tslint:disable-next-line: no-shadowed-variable
  (state: fromVoters.VoterState) => state.entities[state.selectedVoterID]
);

export const getSelectedVoterID = createSelector(
  selectVoterState,
  // tslint:disable-next-line: no-shadowed-variable
  (state: fromVoters.VoterState) => state.selectedVoterID
);
