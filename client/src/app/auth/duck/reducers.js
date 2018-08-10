import types from './types';
import { reducer as FormReducer } from 'redux-form';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      return { ...state, authenticated: action.payload };
    case types.AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default { FormReducer, authReducer };
