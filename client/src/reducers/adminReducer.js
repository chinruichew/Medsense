import { FETCH_ADMIN_CASES } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_CASES:
            return action.payload || false;
        default:
            return state;
    }
}
