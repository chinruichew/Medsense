import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import caseReducer from './caseReducer';
import vettedCaseReducer from './vettedCaseReducer';
import caseByIdReducer from './caseByIdReducer';
import gameByIdReducer from './gameByIdReducer';
import randomGameReducer from './randomGameReducer';
import caseByApproachReducer from './caseByApproachReducer';
import caseBySpecialityReducer from './caseBySpecialityReducer';
import adminReducer from './adminReducer';
import adminUsersReducer from './adminUsersReducer';

export default combineReducers({
    auth: authReducer,
    cases: caseReducer,
    vettedCases: vettedCaseReducer,
    caseById: caseByIdReducer,
    randomCase: randomGameReducer,
    game: gameByIdReducer,
    approachCases: caseByApproachReducer,
    specialityCases: caseBySpecialityReducer,
    adminCases: adminReducer,
    adminUsers: adminUsersReducer,
    form: reduxForm
});