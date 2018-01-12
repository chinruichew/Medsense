import { FETCH_ALL_CASES } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_CASES:
            return action.payload || false;
        default:
            return state;
    }
}
