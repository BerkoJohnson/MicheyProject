import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as VoterActions from '../actions/voter.actions';
import IVoter from '../../models/voter.model';

export const voterFeatureKey = 'voters';

export interface VoterState extends EntityState<IVoter> {
  // additional entities state properties
  error: any;
  selectedVoterID: string | null;
}

export const adapter: EntityAdapter<IVoter> = createEntityAdapter<IVoter>({
  selectId: (voter: IVoter) => voter._id
});

export const initialState: VoterState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedVoterID: undefined
});

export const voterReducer = createReducer(
  initialState,

  // Adding Voter
  on(VoterActions.addVoterSuccess, (state, action) =>
    adapter.addOne(action.voter, state)
  ),
  on(VoterActions.addVoterFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Loading Voters
  on(VoterActions.loadVotersSuccess, (state, action) => {
    return adapter.setAll(action.voters, state);
  }),
  on(VoterActions.loadVotersFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(VoterActions.addManySuccess, (state, action) =>
    adapter.setAll(action.voters, state)
  ),
  on(VoterActions.addManyFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  /** Load Voters */
  on(VoterActions.loadVotersSuccess, (state, action) =>
    adapter.setAll(action.voters, state)
  ),
  on(VoterActions.loadVotersFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  /** Select Voter  */
  on(VoterActions.selectVoter, (state, action) => {
    return {
      ...state,
      selectedVoterID: action.id
    };
  }),
  on(VoterActions.updateVoterFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(VoterActions.deleteVoterSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(VoterActions.deleteVoterFailure, (state, action) => {
    return {
      ...state,
      error: state.error
    };
  }),
  on(VoterActions.deleteManySuccess, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(VoterActions.deleteManyFailure, (state, action) => {
    return {
      ...state,
      error: state.error
    };
  }),
  on(VoterActions.clearVoters, state => adapter.removeAll(state))
);

// export function reducer()

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export function reducer(state: VoterState | undefined, action: Action) {
  return voterReducer(state, action);
}
