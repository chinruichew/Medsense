import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import caseReducer from './caseReducer';
import vettedCaseReducer from './vettedCaseReducer';
import caseByIdReducer from './caseByIdReducer';
import randomGameReducer from './randomGameReducer';
import caseByApproachReducer from './caseByApproachReducer';
import caseBySpecialityReducer from './caseBySpecialityReducer';
import adminReducer from './adminReducer';
import adminUsersReducer from './adminUsersReducer';
import constantsReducer from './constantsReducer';
import gameReducer from "./gameReducer";

export default combineReducers({
    auth: authReducer,
    cases: caseReducer,
    vettedCases: vettedCaseReducer,
    caseById: caseByIdReducer,
    randomCase: randomGameReducer,
    game: gameReducer,
    approachCases: caseByApproachReducer,
    specialityCases: caseBySpecialityReducer,
    adminCases: adminReducer,
    adminUsers: adminUsersReducer,
    constants: constantsReducer,
    form: reduxForm
});