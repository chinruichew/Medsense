import {
    ADD_MCQ_ANSWER_OF_QUESTION, ADD_OPEN_ENDED_ANSWER_OF_QUESTION, FETCH_GAME_BY_ID, SET_GAME_FINAL_DETAILS,
    SET_GAME_OVERVIEW
} from "../actions/types";

const initialState = {
    gameOverview: null,
    openEndedAnswers: [],
    mcqAnswers: []
};

const setGameOverview = (state, action) => {
    const updatedState = {
        gameOverview: {
            case: action.values.case._id,
            score: action.values.score,
            startTime: new Date(),
            attempt: action.values.attempt
        }
    };
    return {
        ...state,
        ...updatedState
    }
};

const fetchGame = (state, action) => {
    return {
        ...state,
        gameCase: {
            ...action.values
        }
    }
};

const addOpenEndedAnswerOfQuestion = (state, action) => {
    const values = {
        ...action.values,
        studentAnswer: action.values.openEnded
    };
    delete values['stem'];
    delete values['attachment'];
    delete values['pearl'];
    delete values['reference'];
    delete values['timeLimit'];
    delete values['seconds'];
    delete values['authid'];
    delete values['date'];
    delete values['showResult'];
    delete values['type'];
    delete values['question'];
    delete values['openEnded'];
    const openEndedAnswers = state.openEndedAnswers;
    openEndedAnswers.push(values);
    const updatedState = {
        openEndedAnswers: openEndedAnswers
    };
    return{
        ...state,
        ...updatedState
    };
};

const addMCQAnswerOfQuestion = (state, action) => {
    const values = {
        ...action.values
    };
    delete values['stem'];
    delete values['attachment'];
    delete values['pearl'];
    delete values['reference'];
    delete values['timeLimit'];
    delete values['seconds'];
    delete values['authid'];
    delete values['date'];
    delete values['showResult'];
    delete values['type'];
    delete values['question'];
    delete values['mcqAnswer'];
    delete values['mcq1'];
    delete values['mcq2'];
    delete values['mcq3'];
    delete values['mcq4'];
    delete values['mcq5'];
    delete values['mcq6'];
    const mcqAnswers = state.mcqAnswers;
    mcqAnswers.push(values);
    const updatedState = {
        mcqAnswers: mcqAnswers
    };
    return{
        ...state,
        ...updatedState
    };
};

const setGameFinalDetails = (state, action) => {
    const gameOverview = {
        ...state.gameOverview,
        score: action.values.score,
        endTime: new Date(),
        xp: action.values.xp
    };
    const updatedState = {
        ...state,
        gameOverview: gameOverview
    };
    delete updatedState['gameCase'];
    return {
        ...state,
        ...updatedState
    }
};

export default function ( state = initialState, action ) {
    switch ( action.type ) {
        case SET_GAME_OVERVIEW:
            return setGameOverview(state, action);
        case FETCH_GAME_BY_ID:
            return fetchGame(state, action);
        case ADD_OPEN_ENDED_ANSWER_OF_QUESTION:
            return addOpenEndedAnswerOfQuestion(state, action);
        case ADD_MCQ_ANSWER_OF_QUESTION:
            return addMCQAnswerOfQuestion(state, action);
        case SET_GAME_FINAL_DETAILS:
            return setGameFinalDetails(state, action);
        default: return state;
    }
};