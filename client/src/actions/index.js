import axios from 'axios';
import {
    FETCH_USER, FETCH_CASES, FETCH_VETTED_CASES, UPDATE_PROFESSOR, UPDATE_STUDENT, UPLOAD_CASE, FETCH_GAME_BY_ID,
    FETCH_CASE_BY_ID, UPDATE_CASE, FETCH_RANDOM_CASE, FETCH_ADMIN_CASES, FETCH_CASE_BY_APPROACH,
    FETCH_CASE_BY_SPECIALITY, DELETE_ADMIN_CASE, FETCH_ADMIN_USERS, FETCH_FILTERED_ADMIN_STUDENTS,
    FETCH_FILTERED_ADMIN_PROFESSORS, FETCH_FILTERED_ADMIN_ADMINS, DELETE_ADMIN_PROFESSOR, DELETE_ADMIN_STUDENT, DELETE_ADMIN_ADMIN, FETCH_FILTERED_ADMIN_CASES,
    STORE_CASE_ANSWER, FETCH_CONSTANT_TYPES, SET_GAME_OVERVIEW,
    ADD_OPEN_ENDED_ANSWER_OF_QUESTION, ADD_MCQ_ANSWER_OF_QUESTION, SET_GAME_FINAL_DETAILS, FETCH_APPROACH,
    ADD_NEW_APPROACH, DELETE_APPROACH, FETCH_SPECIALITY, ADD_NEW_SPECIALITY, DELETE_SPECIALITY,
    FETCH_SUBSPECIALITY, ADD_NEW_SUBSPECIALITY, DELETE_SUBSPECIALITY, GET_GAME_ATTEMPT, GET_GAME_FINAL_DETAILS
} from './types';

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

export const deleteAdminAdmin = (values) => async dispatch => {
    axios.post('/api/deleteAdminAdmin', {
        values
    });
    dispatch({ type: DELETE_ADMIN_ADMIN, payload: values });
};

export const addNewStudent = (values) => async dispatch => {
    const res = await axios.post('/api/addNewStudent', {
        values
    });
    //dispatch({ type: ADD_NEW_STUDENT, payload: res.data });
    return res;
};

export const addNewProfessor = (values) => async dispatch => {
    const res = await axios.post('/api/addNewProfessor', {
        values
    });
    //dispatch({ type: ADD_NEW_PROFESSOR, payload: res.data });
    return res;
};

export const addNewAdmin = (values) => async dispatch => {
    const res = await axios.post('/api/addNewAdmin', {
        values
    });
    //dispatch({ type: ADD_NEW_PROFESSOR, payload: res.data });
    return res
};

export const fetchFilteredAdminStudents = (username, school, year) => async dispatch => {
    const res = await axios.post('/api/fetchFilteredAdminStudents', {
        username, school, year
    });
    dispatch({ type: FETCH_FILTERED_ADMIN_STUDENTS, payload: res.data });
};

export const fetchFilteredAdminProfessors = (subspeciality, speciality, username, school) => async dispatch => {
    const res = await axios.post('/api/fetchFilteredAdminProfessors', {
        subspeciality, speciality, username, school
    });
    dispatch({ type: FETCH_FILTERED_ADMIN_PROFESSORS, payload: res.data });
};

export const fetchFilteredAdminAdmins = (values) => async dispatch => {
    const res = await axios.post('/api/fetchFilteredAdminAdmins', {
        values
    });
    dispatch({ type: FETCH_FILTERED_ADMIN_ADMINS, payload: res.data });
};

export const fetchFilteredAdminCases = (subspeciality, approach, title, casestatus, difficulty) => async dispatch => {
    const res = await axios.post('/api/fetchFilteredAdminCases', {
        subspeciality, approach, title, casestatus, difficulty
    });
    dispatch({ type: FETCH_FILTERED_ADMIN_CASES, payload: res.data });
};

export const storeCaseAnswer = (values, values1, values2, values3, values4) => async dispatch => {
    const res = await axios.post('/api/storeCaseAnswer', {
        values, values1, values2, values3, values4
    });
    dispatch({ type: STORE_CASE_ANSWER, payload: res.data });
};

export const storeCaseAnswerMCQ = (values) => async dispatch => {
    await axios.post('/api/storeCaseAnswerMCQ', {
        values
    });
    // dispatch({ type: FETCH_GAME_BY_ID, payload: res.data });
};

export const storeCaseAnswerOpenEnded = (values) => async dispatch => {
    await axios.post('/api/storeCaseAnswerOpenEnded', {
        values
    });
    // dispatch({ type: FETCH_GAME_BY_ID, payload: res.data });
};

export const fetchConstantTypes = () => async dispatch => {
    const res = await axios.get('/api/getConstantTypes');
    dispatch({ type: FETCH_CONSTANT_TYPES, payload: res.data });
};

export const setGameOverview = (values, attempt) => {
    return {
        type: SET_GAME_OVERVIEW,
        values: {
            ...values,
            attempt
        }
    };
};

export const startGame = (values) => {
    return dispatch => {
        axios.post('/api/getGameAttempt', {
            case: values.case
        }).then(res => {
            const attempt = res.data;
            dispatch(setGameOverview(values, attempt));
        }).catch(err => {
            throw(err);
        });
    };
};

export const getAttempt = () => {
    return (dispatch, getState) => {
        return {
            type: GET_GAME_ATTEMPT,
            values: getState().game.gameOverview
        };
    };
};

export const fetchGame = (values) => {
    return {
        type: FETCH_GAME_BY_ID,
        values
    };
};

export const fetchGameById = (id) => {
    return dispatch => {
        axios.post('/api/fetchGameById', {
            id
        }).then(res => {
            dispatch(fetchGame(res.data));
        }).catch(err => {
            console.log(err);
        })
    };
};

export const addOpenEndedAnswerOfQuestion = (values) => {
    return {
        type: ADD_OPEN_ENDED_ANSWER_OF_QUESTION,
        values
    };
};

export const addMCQAnswerOfQuestion = (values) => {
    return {
        type: ADD_MCQ_ANSWER_OF_QUESTION,
        values
    };
};

export const setGameFinalDetails = (values) => {
    return {
        type: SET_GAME_FINAL_DETAILS,
        values
    };
};

export const getGameFinalDetails = () => {
    return (dispatch, getState) => {
        return {
            type: GET_GAME_FINAL_DETAILS,
            values: getState().game.gameOverview
        };
    };
};

export const completeGame = (values) => {
    return (dispatch, getState) => {
        dispatch(setGameFinalDetails(values));
        const gameValues = {
            gameOverview: getState().game.gameOverview,
            openEndedAnswers: getState().game.openEndedAnswers,
            mcqAnswers: getState().game.mcqAnswers,
        };
        axios.post('/api/completeGame', {
            values: gameValues
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
        axios.post('/api/updateUserPoints', {
            xp: getState().game.gameOverview.xp
        }).then(res => {
            console.log(res);
        });
    };
};

export const fetchApproach = (values) => async dispatch => {
    const res = await axios.post('/api/fetchApproach', {
        values
    });
    dispatch({ type: FETCH_APPROACH, payload: res.data });
};

export const fetchApproach2 = (values) => async dispatch => {
    const res = await axios.post('/api/fetchApproach2', {
        values
    });
    dispatch({ type: FETCH_APPROACH, payload: res.data });
};

export const addNewApproach = (values) => async dispatch => {
    const res = await axios.post('/api/addNewApproach', {
        values
    });
    dispatch({ type: ADD_NEW_APPROACH, payload: res.data });
    return res
};

export const deleteApproach = (values) => async dispatch => {
    axios.post('/api/deleteApproach', {
        values
    });
    dispatch({ type: DELETE_APPROACH, payload: values });
};

export const fetchSpeciality = (values) => async dispatch => {
    const res = await axios.post('/api/fetchSpeciality', {
        values
    });
    dispatch({ type: FETCH_SPECIALITY, payload: res.data });
};

export const addNewSpeciality = (values) => async dispatch => {
    const res = await axios.post('/api/addNewSpeciality', {
        values
    });
    dispatch({ type: ADD_NEW_SPECIALITY, payload: res.data });
    return res
};

export const deleteSpeciality = (values) => async dispatch => {
    axios.post('/api/deleteSpeciality', {
        values
    });
    dispatch({ type: DELETE_SPECIALITY, payload: values });
};

export const fetchSubspeciality = (values) => async dispatch => {
    const res = await axios.post('/api/fetchAdminSubspeciality', {
        values
    });
    dispatch({ type: FETCH_SUBSPECIALITY, payload: res.data });
};

export const addNewSubspeciality = (values) => async dispatch => {
    const res = await axios.post('/api/addNewSubspeciality', {
        values
    });
    dispatch({ type: ADD_NEW_SUBSPECIALITY, payload: res.data });
    return res
};

export const deleteSubspeciality = (values) => async dispatch => {
    axios.post('/api/deleteSubspeciality', {
        values
    });
    dispatch({ type: DELETE_SUBSPECIALITY, payload: values });
};