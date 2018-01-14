import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import caseReducer from './caseReducer';
import vettedCaseReducer from './vettedCaseReducer';
import caseByIdReducer from './caseByIdReducer';
import gameByIdReducer from './gameByIdReducer';
import gameReducer from './gameReducer';
import caseByApproachReducer from './caseByApproachReducer';
import caseBySpecialityReducer from './caseBySpecialityReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    auth: authReducer,
    cases: caseReducer,
    vettedCases: vettedCaseReducer,
    caseById: caseByIdReducer,
    games: gameReducer,
    game: gameByIdReducer,
    approachCases: caseByApproachReducer,
    specialityCases: caseBySpecialityReducer,
    adminCases: adminReducer,
    form: reduxForm
});