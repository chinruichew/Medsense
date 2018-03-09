import { FETCH_APPROACH, ADD_NEW_APPROACH, DELETE_APPROACH } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_APPROACH:
            return action.payload || false;
        case ADD_NEW_APPROACH:
            return state.concat(action.payload) || false;
        case DELETE_APPROACH:
            const approach = action.payload
            return state.filter((item) => item._id !== approach)
        default:
            return state;
    }
}
