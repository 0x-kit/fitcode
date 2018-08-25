import ActionCreators from './actions';
import axios from 'axios';

const { loading, fetchGoals, fetchError, editMacros, setCurrentWeight, setGoalWeight } = ActionCreators;

const complexFetchGoals = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const goals = await axios.get(`/api/user/${userId}/goals`, reqConfig);

    dispatch(fetchGoals(goals.data));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEditMacros = newMacros => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/user/${userId}/macros`, newMacros, reqConfig);

    dispatch(editMacros(response.data));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEnterCurrentWeight = currentWeight => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/user/${userId}/currentweight`, currentWeight, reqConfig);

    dispatch(setCurrentWeight(response.data));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEnterGoalWeight = goalWeight => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/user/${userId}/goalweight`, goalWeight, reqConfig);

    dispatch(setGoalWeight(response.data));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export default {
  complexFetchGoals,
  complexEditMacros,
  complexEnterCurrentWeight,
  complexEnterGoalWeight
};
