import { STORE_CASE_ANSWER } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case STORE_CASE_ANSWER:
            return action.payload || false;
        default:
            return state;
    }
}
