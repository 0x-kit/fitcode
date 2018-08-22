import types from './types';

const fetchError = error => ({ type: types.FETCH_GOALS_ERROR, payload: error });

const fetchGoals = data => ({ type: types.FETCH_GOALS, payload: data });

const editMacros = data => ({
  type: types.EDIT_MACROS,
  payload: data
});

const setCurrentWeight = currentWeight => ({
  type: types.SET_CURRENT_WEIGHT,
  payload: currentWeight
});

export default {
  fetchGoals,
  fetchError,
  editMacros,
  setCurrentWeight
};
