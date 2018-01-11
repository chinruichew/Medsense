import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import caseReducer from './caseReducer';
import vettedCaseReducer from './vettedCaseReducer';
import caseByIdReducer from './caseByIdReducer';
import gameReducer from './gameReducer';

export default combineReducers({
    auth: authReducer,
    cases: caseReducer,
    vettedCases: vettedCaseReducer,
    caseById: caseByIdReducer,
    games: gameReducer,
    form: reduxForm
});