import ActionCreators from './actions';
import axios from 'axios';

const {
  loading,
  fetchExercises,
  fetchError,
  editExercise,
  addExercise,
  deleteExercise,
  selectExercise,
  resetMessage
} = ActionCreators;

const complexFetchExercises = (date) => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const fDate = date.format('YYYY-MM-DD');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(`/api/user/${userId}/exercise?date=${fDate}`, reqConfig);

    dispatch(fetchExercises(response.data));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEditExercise = (exerciseId, newExercise) => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/exercise/${exerciseId}`, newExercise, reqConfig);
    const { exercise, message } = response.data;

    dispatch(editExercise([exercise], message));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexAddExercise = newExercise => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.post(`/api/exercise`, newExercise, reqConfig);
    const { exercise, message } = response.data;

    dispatch(addExercise([exercise], message));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexDeleteExercise = exerciseId => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.delete(`/api/exercise/${exerciseId}`, reqConfig);
    const { exercise, message } = response.data;
    dispatch(deleteExercise(exercise._id, message));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export default {
  complexFetchExercises,
  complexAddExercise,
  complexEditExercise,
  complexDeleteExercise,
  selectExercise,
  resetMessage
};
