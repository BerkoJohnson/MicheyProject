import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as CandidateActions from '../actions/candidate.actions';
import ICandidate from '../../models/candidate.model';

export const candidateFeatureKey = 'candidates';

export interface CandidateState extends EntityState<ICandidate> {
  // additional entities state properties
  error: any;
  selectedCandidateID: string | null;
}

export const adapter: EntityAdapter<ICandidate> = createEntityAdapter<
  ICandidate
>({
  selectId: (candidate: ICandidate) => candidate._id
});

export const initialState: CandidateState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedCandidateID: undefined
});

export const candidateReducer = createReducer(
  initialState,

  // Adding Candidate
  on(CandidateActions.addCandidateSuccess, (state, action) =>
    adapter.addOne(action.candidate, state)
  ),
  on(CandidateActions.addCandidateFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Loading Candidates
  on(CandidateActions.loadCandidatesSuccess, (state, action) => {
    return adapter.setAll(action.candidates, state);
  }),
  // on(CandidateActions.loadCandidates, (state, action) => {
  //   return {
  //     ...state,
  //     selectedCandidateID: null
  //   };
  // }),

  on(CandidateActions.loadCandidatesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Select Candidate
  on(CandidateActions.selectCandidate, (state, action) => {
    return {
      ...state,
      selectedCandidateID: action.id
    };
  }),
  on(CandidateActions.updateCandidateFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(CandidateActions.deleteCandidateSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(CandidateActions.deleteCandidateFailure, (state, action) => {
    return {
      ...state,
      error: state.error
    };
  }),
  // on(CandidateActions.deleteCandidates, (state, action) =>
  //   adapter.removeMany(action.ids, state)
  // ),
  on(CandidateActions.clearCandidates, state => adapter.removeAll(state))
);

// export function reducer()

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export function reducer(state: CandidateState | undefined, action: Action) {
  return candidateReducer(state, action);
}
