import { FETCH_CASE_BY_SPECIALITY } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_CASE_BY_SPECIALITY:
            return action.payload || false;
        default:
            return state;
    }
}