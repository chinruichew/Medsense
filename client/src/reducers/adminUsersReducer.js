import { FETCH_ADMIN_USERS, ADD_NEW_STUDENT, ADD_NEW_PROFESSOR, FETCH_FILTERED_ADMIN_STUDENTS, FETCH_FILTERED_ADMIN_PROFESSORS, FETCH_FILTERED_ADMIN_ADMINS, DELETE_ADMIN_STUDENT, DELETE_ADMIN_PROFESSOR, DELETE_ADMIN_ADMIN } from '../actions/types';

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
        case FETCH_FILTERED_ADMIN_ADMINS:
            return action.payload || false;
        case DELETE_ADMIN_STUDENT:
            const studentid = action.payload
            return state.filter((item) => item._id !== studentid)
        case DELETE_ADMIN_ADMIN:
            const adminid = action.payload
            return state.filter((item) => item._id !== adminid)
        case DELETE_ADMIN_PROFESSOR:
            const professorid = action.payload
            return state.filter((item) => item._id !== professorid)
        default:
            return state;
    }
}
