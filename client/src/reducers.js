import { combineReducers } from 'redux';

import auth from 'app/auth/duck';
import homeReducer from 'app/home/duck';

export default combineReducers({
  auth: auth.authReducer,
  form: auth.authFormReducer,
  home: homeReducer
});
