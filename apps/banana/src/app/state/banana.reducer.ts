import { GET_NEW_BANANA, PEEL_BANANA } from './banana.action';
import * as programActions from './banana.action';
import { State } from './banana.state';

export function reducer(
  state: State,
  action: programActions.BananaAction
): State {
  switch (action.type) {
    case GET_NEW_BANANA: {
      console.log('REDUCER ' + GET_NEW_BANANA);
      return {
        isPeeled: false,
        bitesRemaining: 9,
        color: 'yellow'
      };
    }

    case PEEL_BANANA: {
      console.log('REDUCER ' + PEEL_BANANA);
      return {
        ...state,
        isPeeled: true
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
}
