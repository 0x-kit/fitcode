import { combineReducers } from 'redux';

import auth from 'app/auth/duck';
import home from 'app/home/duck';

export default combineReducers({
  auth: auth.authReducer,
  form: auth.authFormReducer,
  home: home.homeReducer,
  search: home.searchFormReducer
});
