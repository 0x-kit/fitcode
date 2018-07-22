import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

// redux thunk: inside 1 action creator we can dispatch as many actions as we wish at any given time
export const signup = (formProps, callback) => async dispatch => {
  let response;
  try {
    response = await axios.post('api/auth/signup', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    //  persist auth state
    localStorage.setItem('token', response.data.token);

    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  let response;
  try {
    response = await axios.post('api/auth/signin', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    //  persist auth state
    localStorage.setItem('token', response.data.token);

    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
  }
};

export const socialSignin = (token, callback) => async dispatch => {
  dispatch({ type: AUTH_USER, payload: token });
  localStorage.setItem('token', token);
  callback();
};

export const signout = callback => async dispatch => {
  localStorage.removeItem('token');

  dispatch({ type: AUTH_ERROR, payload: '' });
  dispatch({ type: AUTH_USER, payload: '' });

  callback();
};
