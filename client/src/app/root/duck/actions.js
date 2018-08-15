import types from './types';

const authError = error => ({ type: types.AUTH_ERROR, payload: error });

const signup = token => ({ type: types.AUTH_USER, payload: token });

const signin = token => ({ type: types.AUTH_USER, payload: token });

const socialSignin = token => ({ type: types.AUTH_USER, payload: token });

const signout = () => ({ type: types.AUTH_USER, payload: '' });

export default {
  authError,
  signup,
  signin,
  socialSignin,
  signout
};
