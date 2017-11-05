import { FETCH_USER, UPDATE_PROFESSOR, UPDATE_STUDENT } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        case UPDATE_PROFESSOR:
            return action.payload || false;
        case UPDATE_STUDENT:
            return action.payload || false;
        default:
            return state;
    }
}
