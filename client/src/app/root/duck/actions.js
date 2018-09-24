import types from './types';

const authError = error => ({ type: types.AUTH_ERROR, payload: error });

const signup = (token, userInfo) => ({ type: types.AUTH_USER, payload: { token, userInfo } });

const signin = (token, userInfo) => ({ type: types.AUTH_USER, payload: { token, userInfo } });

const signout = (token = '', userInfo = '') => ({ type: types.AUTH_USER, payload: { token, userInfo } });

const selectMainTab = tab => ({ type: types.MAIN_TAB, payload: tab });

const selectSecondaryTab = tab => ({ type: types.SECONDARY_TAB, payload: tab });

export default {
  authError,
  signup,
  signin,
  signout,
  selectMainTab,
  selectSecondaryTab
};
