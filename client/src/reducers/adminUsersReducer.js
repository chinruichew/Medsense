import { FETCH_ADMIN_USERS, ADD_NEW_STUDENT, ADD_NEW_PROFESSOR, FETCH_FILTERED_ADMIN_STUDENTS, FETCH_FILTERED_ADMIN_PROFESSORS } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_USERS:
            return action.payload || false;
        case ADD_NEW_STUDENT:
            return state.concat(action.payload) || false;
        case ADD_NEW_PROFESSOR:
            return state.concat(action.payload) || false;
        case FETCH_FILTERED_ADMIN_STUDENTS:
            return action.payload || false;
        case FETCH_FILTERED_ADMIN_PROFESSORS:
            return action.payload || false;
        default:
            return state;
    }
}
