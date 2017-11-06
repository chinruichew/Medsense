import axios from 'axios';
import { FETCH_USER, FETCH_CASES, UPDATE_PROFESSOR, UPDATE_STUDENT, UPLOAD_CASE} from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUnvetCases = () => async dispatch => {
    const res = await axios.get('/api/fetchUnvetCases');
    dispatch({ type: FETCH_CASES, payload: res.data });
};

export const handleSignUp = (values) => {
    const res = axios.post('/api/signup', {
        values
    });
};

export const updateProfessor = (values) => async dispatch => {
    const res = axios.post('/api/updateProfessor', {
        values
    });
    return {
        type: UPDATE_PROFESSOR,
        payload: res
    }
};

export const updateStudent = (values) => async dispatch => {
    const res = axios.post('/api/updateStudent', {
        values
    });
    return {
        type: UPDATE_STUDENT,
        payload: res
    }
};

export const uploadCase = (values) => async dispatch => {
    const res = axios.post('/api/uploadCase', {
        values
    });
    return {
        type: UPLOAD_CASE,
        payload: res
    }
};