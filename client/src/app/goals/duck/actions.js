import types from './types';

const loading = flag => ({
  type: types.LOADING,
  payload: flag
});

const resetMessage = message => ({ type: types.RESET_MESSAGE, payload: message });

const fetchError = error => ({ type: types.FETCH_GOALS_ERROR, payload: error });

const fetchGoals = (data, date) => ({ type: types.FETCH_GOALS, payload: { data, date } });

const fetchHistory = (diaries, weights) => ({ type: types.FETCH_HISTORY, payload: { diaries, weights } });

const editMacros = (macros, message) => ({
  type: types.EDIT_MACROS,
  payload: { macros, message }
});

const setCurrentWeight = (currentWeight, message, date) => ({
  type: types.SET_CURRENT_WEIGHT,
  payload: { currentWeight, message, date }
});
const setGoalWeight = (goalWeight, message) => ({
  type: types.SET_GOAL_WEIGHT,
  payload: { goalWeight, message }
});

const setFromDate = date => ({
  type: types.SET_FROMDATE,
  payload: date
});

const setToDate = date => ({
  type: types.SET_TODATE,
  payload: date
});

export default {
  fetchGoals,
  fetchHistory,
  fetchError,
  editMacros,
  setCurrentWeight,
  setGoalWeight,
  setFromDate,
  setToDate,
  loading,
  resetMessage
};
