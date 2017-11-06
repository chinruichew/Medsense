import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import caseReducer from './caseReducer';
import vettedCaseReducer from './vettedCaseReducer';

export default combineReducers({
    auth: authReducer,
    cases: caseReducer,
    vettedCases: vettedCaseReducer,
    form: reduxForm
});