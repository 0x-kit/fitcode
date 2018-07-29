import types from './types';

const fetchError = error => ({ type: types.FETCH_HOME_ERROR, payload: error });

const fetchDiet = data => ({ type: types.FETCH_DIETSUMMARY, payload: data });

const fetchMeals = data => ({ type: types.FETCH_MEALS, payload: data });

export default {
  fetchDiet,
  fetchMeals,
  fetchError
};
