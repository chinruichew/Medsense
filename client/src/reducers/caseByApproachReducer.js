import { FETCH_CASE_BY_APPROACH } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_CASE_BY_APPROACH:
            return action.payload || false;
        default:
            return state;
    }
}