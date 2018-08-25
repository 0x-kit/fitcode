import ActionCreators from './actions';
import axios from 'axios';

const { authError, signup, signin, socialSignin, signout } = ActionCreators;

const complexSignUp = (formProps, redirect) => async dispatch => {
  try {
    const response = await axios.post('api/auth/signup', formProps);

    dispatch(signup(response.data.token));

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user);

    redirect();
  } catch (err) {
    dispatch(authError(err.response.data.message));
  }
};

const complexSignin = (formProps, redirect) => async dispatch => {
  try {
    const response = await axios.post('api/auth/signin', formProps);

    dispatch(signin(response.data.token));
    //  persist auth state
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user);

    redirect();
  } catch (err) {
    dispatch(authError(err.response.data.message));
  }
};

const complexSocialSignin = (token, userId, redirect) => async dispatch => {
  dispatch(socialSignin(token));
  //  persist auth state
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);

  redirect();
};

const complexSignout = redirect => async dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  dispatch(authError(''));
  dispatch(signout());

  redirect();
};

export default {
  authError,
  complexSignUp,
  complexSignin,
  complexSocialSignin,
  complexSignout
};
