import { FETCH_GAME_BY_ID } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_GAME_BY_ID:
            return action.payload || false;
        default:
            return state;
    }
}
