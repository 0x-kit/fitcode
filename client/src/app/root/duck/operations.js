import ActionCreators from './actions';
import axios from 'axios';

const { authError, signup, signin, signout, selectMainTab, selectSecondaryTab } = ActionCreators;

const complexSignUp = (formProps, redirect) => async dispatch => {
  try {
    const response = await axios.post('api/auth/signup', formProps);
    const { token, user } = response.data;

    const reqConfig = { headers: { authorization: token } };
    const userInfo = await axios.get(`api/user/${user}`, reqConfig);

    dispatch(signup(token, userInfo.data.name));

    localStorage.setItem('token', token);
    localStorage.setItem('userId', user);
    localStorage.setItem('userInfo', userInfo.data.name);

    redirect();
  } catch (err) {
    dispatch(authError(err.response.data.message));
  }
};

const complexSignin = (formProps, redirect) => async dispatch => {
  try {
    const response = await axios.post('api/auth/signin', formProps);
    const { token, user } = response.data;

    const reqConfig = { headers: { authorization: token } };
    const userInfo = await axios.get(`api/user/${user}`, reqConfig);

    dispatch(signin(token, userInfo.data.name));

    localStorage.setItem('token', token);
    localStorage.setItem('userId', user);
    localStorage.setItem('userInfo', userInfo.data.name);

    redirect();
  } catch (err) {
    dispatch(authError(err.response.data.message));
  }
};

const complexSocialSignin = (token, userId, redirect) => async dispatch => {
  try {
    const reqConfig = { headers: { authorization: token } };
    const userInfo = await axios.get(`api/user/${userId}`, reqConfig);

    dispatch(signin(token, userInfo.data.name));

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userInfo', userInfo.data.name);

    redirect();
  } catch (err) {
    dispatch(authError(err.response.data.message));
  }
};

const complexSignout = redirect => async dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userInfo');

  dispatch(authError(''));
  dispatch(signout());

  redirect();
};

export default {
  authError,
  complexSignUp,
  complexSignin,
  complexSocialSignin,
  complexSignout,
  selectMainTab,
  selectSecondaryTab
};
