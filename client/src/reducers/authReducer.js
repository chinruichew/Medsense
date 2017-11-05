import { FETCH_USER, UPDATE_PROFESSOR } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        case UPDATE_PROFESSOR:
            return action.payload || false;
        default:
            return state;
    }
}
