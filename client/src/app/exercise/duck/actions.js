import types from './types';

const loading = flag => ({
  type: types.LOADING,
  payload: flag
});

const resetMessage = message => ({ type: types.RESET_MESSAGE, payload: message });

const fetchError = error => ({ type: types.FETCH_EXERCISE_ERROR, payload: error });

const fetchExercises = data => ({ type: types.FETCH_EXERCISES, payload: data });

const editExercise = (exercise, message) => ({
  type: types.EDIT_EXERCISE,
  payload: { exercise, message }
});

const addExercise = (exercise, message) => ({
  type: types.ADD_EXERCISE,
  payload: { exercise, message }
});

const deleteExercise = (exercise, message) => ({
  type: types.DELETE_EXERCISE,
  payload: { exercise, message }
});

const selectExercise = data => ({
  type: types.SELECT_EXERCISE,
  payload: data
});

export default {
  fetchError,
  fetchExercises,
  editExercise,
  addExercise,
  deleteExercise,
  selectExercise,
  loading,
  resetMessage
};
