import ActionCreators from './actions';
import axios from 'axios';

const {
  loading,
  fetchExercises,
  fetchError,
  editExercise,
  addExercise,
  deleteExercise,
  selectExercise
} = ActionCreators;

const complexFetchExercises = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(`/api/user/${userId}/exercise`, reqConfig);

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

    dispatch(editExercise([response.data]));

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

    dispatch(addExercise([response.data]));

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

    dispatch(deleteExercise(response.data));

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
  selectExercise
};
