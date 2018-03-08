import { FETCH_APPROACH } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_APPROACH:
            return action.payload || false;
        default:
            return state;
    }
}
