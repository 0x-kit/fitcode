import types from './types';

const authError = error => ({ type: types.AUTH_ERROR, payload: error });

const signup = token => ({ type: types.AUTH_USER, payload: token });

const signin = token => ({ type: types.AUTH_USER, payload: token });

const socialSignin = token => ({ type: types.AUTH_USER, payload: token });

const signout = () => ({ type: types.AUTH_USER, payload: '' });

const selectMainTab = tab => ({ type: types.MAIN_TAB, payload: tab });

const selectSecondaryTab = tab => ({ type: types.SECONDARY_TAB, payload: tab });

export default {
  authError,
  signup,
  signin,
  socialSignin,
  signout,
  selectMainTab,
  selectSecondaryTab
};
