import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as PositionActions from '../actions/position.actions';
import IPosition from '../../models/position.model';

export const positionsFeatureKey = 'positions';

export interface PositionState extends EntityState<IPosition> {
  // additional entities state properties
  error: any;
  selectedPositionID: string | null;
}

export function sortByTitle(a: IPosition, b: IPosition): number {
  return a.title.localeCompare(b.title);
}

export const adapter: EntityAdapter<IPosition> = createEntityAdapter<IPosition>(
  {
    selectId: (position: IPosition) => position._id,
    sortComparer: sortByTitle
  }
);

export const initialState: PositionState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedPositionID: undefined
});

export const positionReducer = createReducer(
  initialState,

  // Adding Position
  on(PositionActions.addPositionSuccess, (state, action) =>
    adapter.addOne(action.position, state)
  ),
  on(PositionActions.addPositionFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Loading Positions
  on(PositionActions.loadPositionsSuccess, (state, action) => {
    return adapter.setAll(action.positions, state);
  }),

  on(PositionActions.loadPositionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Select Position
  on(PositionActions.selectPosition, (state, action) => {
    return {
      ...state,
      selectedPositionID: action.id
    };
  }),
  on(PositionActions.updatePosition, (state, action) =>
    adapter.updateOne(action.position, state)
  ),
  on(PositionActions.deletePosition, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  // on(PositionActions.deletePositions, (state, action) =>
  //   adapter.removeMany(action.ids, state)
  // ),
  on(PositionActions.clearPositions, state => adapter.removeAll(state))
);

// export function reducer()

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export function reducer(state: PositionState | undefined, action: Action) {
  return positionReducer(state, action);
}
