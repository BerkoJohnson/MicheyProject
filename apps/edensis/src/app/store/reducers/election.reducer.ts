import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ElectionActions from '../actions/election.actions';
import IElection from '../../models/election.model';

export const electionsFeatureKey = 'elections';

export interface ElectionState extends EntityState<IElection> {
  // additional entities state properties
  error: any;
  selectedElectionID: string | null;
}

export function sortByAcademicYear(a: IElection, b: IElection): number {
  return a.academicYear.localeCompare(b.academicYear);
}

export const adapter: EntityAdapter<IElection> = createEntityAdapter<IElection>(
  {
    selectId: (election: IElection) => election._id,
    sortComparer: sortByAcademicYear
  }
);

export const initialState: ElectionState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedElectionID: undefined
});

export const electionReducer = createReducer(
  initialState,

  // Adding Election
  on(ElectionActions.addElectionSuccess, (state, { election }) =>
    adapter.addOne(election, state)
  ),
  on(ElectionActions.addElectionFailure, (state, { error }) => {
    return {
      ...state,
      error: error
    };
  }),

  // Loading Elections
  on(ElectionActions.loadElectionsSuccess, (state, { elections }) => {
    return adapter.setAll(elections, state);
  }),

  on(ElectionActions.loadElectionsFailure, (state, { error }) => {
    return {
      ...state,
      error: error
    };
  }),

  on(ElectionActions.selectElection, (state, { id }) => {
    return {
      ...state,
      selectedElectionID: id
    };
  }),

  on(ElectionActions.updateElectionSuccess, (state, { election }) =>
    adapter.updateOne(election, state)
  ),
  on(ElectionActions.updateElectionFailure, (state, { error }) => {
    return {
      ...state,
      error: error
    };
  }),
  on(ElectionActions.deleteElection, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  on(ElectionActions.deleteElections, (state, { ids }) =>
    adapter.removeMany(ids, state)
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

export function reducer(state: ElectionState | undefined, action: Action) {
  return electionReducer(state, action);
}
