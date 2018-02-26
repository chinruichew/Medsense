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
            startTime: new Date()
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
    const openEndedAnswers = state.openEndedAnswers;
    openEndedAnswers.push(action.values);
    const updatedState = {
        openEndedAnswers: openEndedAnswers
    };
    return{
        ...state,
        ...updatedState
    };
};

const addMCQAnswerOfQuestion = (state, action) => {
    const mcqAnswers = state.mcqAnswers;
    mcqAnswers.push(action.values);
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
        endTime: new Date()
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