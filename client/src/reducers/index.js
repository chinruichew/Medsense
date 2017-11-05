import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import caseReducer from './caseReducer';

export default combineReducers({
    auth: authReducer,
    cases: caseReducer,
    form: reduxForm
});