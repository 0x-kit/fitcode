import types from './types';

const fetchError = error => ({ type: types.FETCH_HOME_ERROR, payload: error });

const fetchGoals = data => ({ type: types.FETCH_GOALS, payload: data });

const fetchMeals = data => ({ type: types.FETCH_MEALS, payload: data });

export default {
  fetchGoals,
  fetchMeals,
  fetchError
};
