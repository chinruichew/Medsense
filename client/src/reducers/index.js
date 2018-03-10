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
import adminApproachReducer from './adminApproachReducer';
import adminSpecialityReducer from './adminSpecialityReducer';
import adminSubspecialityReducer from './adminSubspecialityReducer';
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
    approach: adminApproachReducer,
    speciality: adminSpecialityReducer,
    subspeciality: adminSubspecialityReducer,
    constants: constantsReducer,
    form: reduxForm
});