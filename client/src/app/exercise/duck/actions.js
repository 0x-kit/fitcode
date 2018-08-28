import types from './types';

const loading = flag => ({
  type: types.LOADING,
  payload: flag
});

const fetchError = error => ({ type: types.FETCH_EXERCISE_ERROR, payload: error });

const fetchExercises = data => ({ type: types.FETCH_EXERCISES, payload: data });

const editExercise = data => ({
  type: types.EDIT_EXERCISE,
  payload: data
});

const addExercise = data => ({
  type: types.ADD_EXERCISE,
  payload: data
});

const deleteExercise = data => ({
  type: types.DELETE_EXERCISE,
  payload: data
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
  loading
};
