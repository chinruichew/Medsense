import axios from 'axios';
import { FETCH_USER, FETCH_CASES, FETCH_VETTED_CASES, UPDATE_PROFESSOR, UPDATE_STUDENT, UPLOAD_CASE, FETCH_GAME_BY_ID, FETCH_CASE_BY_ID, UPDATE_CASE, FETCH_RANDOM_CASE, FETCH_ADMIN_CASES, FETCH_CASE_BY_APPROACH, FETCH_CASE_BY_SPECIALITY, DELETE_ADMIN_CASE, FETCH_ADMIN_USERS, FETCH_FILTERED_ADMIN_STUDENTS, FETCH_FILTERED_ADMIN_PROFESSORS, DELETE_ADMIN_PROFESSOR, DELETE_ADMIN_STUDENT, FETCH_FILTERED_ADMIN_CASES } from './types';

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
    axios.post('/api/deleteAdminCase', {
        values
    });
    dispatch({ type: DELETE_ADMIN_CASE, payload: values });
};

export const deleteAdminStudent = (values) => async dispatch => {
    axios.post('/api/deleteAdminStudent', {
        values
    });
    dispatch({ type: DELETE_ADMIN_STUDENT, payload: values });
};

export const deleteAdminProfessor = (values) => async dispatch => {
    axios.post('/api/deleteAdminProfessor', {
        values
    });
    dispatch({ type: DELETE_ADMIN_PROFESSOR, payload: values });
};

export const addNewStudent = (values) => async dispatch => {
    const res = await axios.post('/api/addNewStudent', {
        values
    });
    //dispatch({ type: ADD_NEW_STUDENT, payload: res.data });
    return res
};

export const addNewProfessor = (values) => async dispatch => {
    const res = await axios.post('/api/addNewProfessor', {
        values
    });
    //dispatch({ type: ADD_NEW_PROFESSOR, payload: res.data });
    return res
};

export const fetchFilteredAdminStudents = (values) => async dispatch => {
    const res = await axios.post('/api/fetchFilteredAdminStudents', {
        values
    });
    dispatch({ type: FETCH_FILTERED_ADMIN_STUDENTS, payload: res.data });
};

export const fetchFilteredAdminProfessors = (values) => async dispatch => {
    const res = await axios.post('/api/fetchFilteredAdminProfessors', {
        values
    });
    dispatch({ type: FETCH_FILTERED_ADMIN_PROFESSORS, payload: res.data });
};

export const fetchFilteredAdminCases = (values) => async dispatch => {
    const res = await axios.post('/api/fetchFilteredAdminCases', {
        values
    });
    dispatch({ type: FETCH_FILTERED_ADMIN_CASES, payload: res.data });
};

export const fetchGameById = (values) => async dispatch => {
    const res = await axios.post('/api/fetchGameById', {
        values
    });
    dispatch({ type: FETCH_GAME_BY_ID, payload: res.data });
};

export const storeCaseAnswer = (values, values1) => async dispatch => {
    const res = await axios.post('/api/storeCaseAnswer', {
        values, values1
    });
    //dispatch({ type: FETCH_GAME_BY_ID, payload: res.data });
};

export const storeCaseAnswerMCQ = (values) => async dispatch => {
    const res = await axios.post('/api/storeCaseAnswerMCQ', {
        values
    });
    //dispatch({ type: FETCH_GAME_BY_ID, payload: res.data });
};