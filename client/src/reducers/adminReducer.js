import { FETCH_ADMIN_CASES, DELETE_ADMIN_CASE } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_CASES:
            return action.payload || false;
        case DELETE_ADMIN_CASE:
            const id = action.payload
            return state.filter((item) => item._id !== id)
        default:
            return state;
    }
}
