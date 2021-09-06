// Import dependenices 
import {combineReducers} from 'redux';
import {authReducer} from './auth';
// set root reducer = combined reducer and set auth reducer into place
const rootReducer = combineReducers({
    auth: authReducer,
  });
 
  export default rootReducer;