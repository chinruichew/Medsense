import axios from 'axios';
import { FETCH_USER, FETCH_CASES, FETCH_VETTED_CASES, UPDATE_PROFESSOR, UPDATE_STUDENT, UPLOAD_CASE, FETCH_GAME_BY_ID, FETCH_CASE_BY_ID, UPDATE_CASE, FETCH_RANDOM_CASE, FETCH_ADMIN_CASES, FETCH_CASE_BY_APPROACH, FETCH_CASE_BY_SPECIALITY, DELETE_ADMIN_CASE, FETCH_ADMIN_USERS } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUnvetCases = () => async dispatch => {
    const res = await axios.get('/api/fetchUnvetCases');
    dispatch({ type: FETCH_CASES, payload: res.data });
};

export const fetchVettedCases = () => async dispatch => {
    const res = await axios.get('/api/fetchVettedCases');
    dispatch({ type: FETCH_VETTED_CASES, payload: res.data });
};

export const fetchRandomCase = () => async dispatch => {
    const res = await axios.get('/api/fetchRandomCase');
    dispatch({ type: FETCH_RANDOM_CASE, payload: res.data });
};

export const fetchCaseByApproach = (values) => async dispatch => {
    const res = await axios.post('/api/fetchCaseByApproach', {
        values
    });
    dispatch({ type: FETCH_CASE_BY_APPROACH, payload: res.data });
};

export const fetchCaseBySpeciality = (values) => async dispatch => {
    const res = await axios.post('/api/fetchCaseBySpeciality', {
        values
    });
    dispatch({ type: FETCH_CASE_BY_SPECIALITY, payload: res.data });
};

export const fetchCaseById = (values) => async dispatch => {
    const res = await axios.post('/api/fetchCaseById', {
        values
    });
    dispatch({ type: FETCH_CASE_BY_ID, payload: res.data });
};

export const handleSignUp = (values) => {
    const res = axios.post('/api/signup', {
        values
    });
    console.log(res);
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

export const updateCase = (values) => async dispatch => {
    const res = axios.post('/api/updateCase', {
        values
    });
    return {
        type: UPDATE_CASE,
        payload: res
    }
};

export const fetchAdminCases = () => async dispatch => {
    const res = await axios.get('/api/fetchAdminCases');
    dispatch({ type: FETCH_ADMIN_CASES, payload: res.data });
};

export const fetchAdminUsers = () => async dispatch => {
    const res = await axios.get('/api/fetchAdminUsers');
    dispatch({ type: FETCH_ADMIN_USERS, payload: res.data });
};

export const deleteAdminCase = (values) => async dispatch => {
    const res = axios.post('/api/deleteAdminCase', {
        values
    });
    dispatch({ type: DELETE_ADMIN_CASE, payload: values });
};

export const fetchGameById = (values) => async dispatch => {
    const res = await axios.post('/api/fetchGameById', {
        values
    });
    dispatch({ type: FETCH_GAME_BY_ID, payload: res.data });
};