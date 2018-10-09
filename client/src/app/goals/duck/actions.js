import types from './types';

const loading = flag => ({
  type: types.LOADING,
  payload: flag
});

const resetMessage = message => ({ type: types.RESET_MESSAGE, payload: message });

const fetchError = error => ({ type: types.FETCH_GOALS_ERROR, payload: error });

const fetchGoals = data => ({ type: types.FETCH_GOALS, payload: data });

const fetchHistory = data => ({ type: types.FETCH_HISTORY, payload: data });

const editMacros = (macros, message) => ({
  type: types.EDIT_MACROS,
  payload: { macros, message }
});

const setCurrentWeight = (currentWeight, message) => ({
  type: types.SET_CURRENT_WEIGHT,
  payload: { currentWeight, message }
});
const setGoalWeight = (goalWeight, message) => ({
  type: types.SET_GOAL_WEIGHT,
  payload: { goalWeight, message }
});

export default {
  fetchGoals,
  fetchHistory,
  fetchError,
  editMacros,
  setCurrentWeight,
  setGoalWeight,
  loading,
  resetMessage
};
