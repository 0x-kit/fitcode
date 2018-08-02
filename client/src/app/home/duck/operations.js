import ActionCreators from './actions';
import axios from 'axios';
const { fetchGoals, fetchMeals, fetchError } = ActionCreators;

const complexFetchGoals = userId => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(`api/user/${userId}/goals`, reqConfig);
   
    dispatch(fetchGoals(response.data));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

const complexFetchMeals = userId => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(`api/diary/${userId}`, reqConfig);

    dispatch(fetchMeals(response.data));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

export default {
  complexFetchGoals,
  complexFetchMeals
};
