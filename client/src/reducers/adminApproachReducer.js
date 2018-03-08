import { FETCH_APPROACH, ADD_NEW_APPROACH } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_APPROACH:
            return action.payload || false;
        case ADD_NEW_APPROACH:
            return state.concat(action.payload) || false;
        default:
            return state;
    }
}
