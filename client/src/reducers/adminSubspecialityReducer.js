import { FETCH_SUBSPECIALITY, ADD_NEW_SUBSPECIALITY, DELETE_SUBSPECIALITY } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_SUBSPECIALITY:
            return action.payload || false;
        case ADD_NEW_SUBSPECIALITY:
            return state.concat(action.payload) || false;
        case DELETE_SUBSPECIALITY:
            const subspeciality = action.payload
            return state.filter((item) => item._id !== subspeciality)
        default:
            return state;
    }
}
