import { FETCH_RANDOM_CASE } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_RANDOM_CASE:
            return action.payload || false;
        default:
            return state;
    }
}