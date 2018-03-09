import { FETCH_SPECIALITY, ADD_NEW_SPECIALITY, DELETE_SPECIALITY } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_SPECIALITY:
            return action.payload || false;
        case ADD_NEW_SPECIALITY:
            return state.concat(action.payload) || false;
        case DELETE_SPECIALITY:
            const speciality = action.payload
            return state.filter((item) => item._id !== speciality)
        default:
            return state;
    }
}
