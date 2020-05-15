import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ElectionActions from './election.actions';
import IElection from '../../models/election.model';
import ICandidate from '../../models/candidate.model';
import IPosition from '../../models/position.model';

export const electionsFeatureKey = 'elections';

export interface ElectionState extends EntityState<IElection> {
  // additional entities state properties
  error: any;
  selectedElection: IElection;
  positions: IPosition[];
  candidates: ICandidate[];
  useElection: IElection;
  currentCandidate: ICandidate;
  currentPosition: IPosition;
}

export const adapter: EntityAdapter<IElection> = createEntityAdapter<IElection>(
  {
    selectId: (election: IElection) => election._id
  }
);

export const initialState: ElectionState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedElection: undefined,
  useElection: undefined,
  currentCandidate: undefined,
  currentPosition: undefined,
  candidates: undefined,
  positions: undefined
});

export const reducer = createReducer(
  initialState,

  // Adding Election
  on(ElectionActions.addElectionSuccess, (state, action) =>
    adapter.addOne(action.election, state)
  ),
  on(ElectionActions.addElectionFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Adding Position
  on(ElectionActions.addPositionSuccess, (state, action) => {
    return {
      ...state
    };
  }),
  on(ElectionActions.addPositionFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Loading Elections
  on(ElectionActions.loadElectionsSuccess, (state, action) => {
    return adapter.setAll(action.elections, state);
  }),

  on(ElectionActions.loadElectionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Loading Individual Election
  on(ElectionActions.loadElectionSuccess, (state, action) => {
    return {
      ...state,
      selectedElection: action.selectedElection
    };
  }),

  on(ElectionActions.loadElectionFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Load Candidate
  on(ElectionActions.loadCandidateSuccess, (state, action) => {
    return {
      ...state,
      currentCandidate: action.candidate
    };
  }),
  on(ElectionActions.loadCandidateFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(ElectionActions.setCurrentElection, (state, action) => {
    return {
      ...state,
      useElection: action.election
    };
  }),

  on(ElectionActions.setCurrentPosition, (state, action) => {
    return {
      ...state,
      currentPosition: action.position
    };
  }),

  on(ElectionActions.upsertElection, (state, action) =>
    adapter.upsertOne(action.election, state)
  ),
  on(ElectionActions.upsertElections, (state, action) =>
    adapter.upsertMany(action.elections, state)
  ),
  on(ElectionActions.updateElection, (state, action) =>
    adapter.updateOne(action.election, state)
  ),
  on(ElectionActions.updateElections, (state, action) =>
    adapter.updateMany(action.elections, state)
  ),
  on(ElectionActions.deleteElection, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ElectionActions.deleteElections, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(ElectionActions.clearElections, state => adapter.removeAll(state))
);

// export function reducer()

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
