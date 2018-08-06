import types from './types';

const fetchError = error => ({ type: types.FETCH_HOME_ERROR, payload: error });

const fetchGoals = data => ({ type: types.FETCH_GOALS, payload: data });

const fetchMeals = data => ({ type: types.FETCH_MEALS, payload: data });

const searchProducts = data => ({ type: types.SEARCH_PRODUCTS, payload: data });

const selectProduct = product => ({
  type: types.SELECT_PRODUCT,
  payload: product
});

const selectMeal = (mealId, part) => ({
  type: types.SELECT_MEAL,
  payload: { mealId, part }
});

export default {
  fetchGoals,
  fetchMeals,
  fetchError,
  searchProducts,
  selectProduct,
  selectMeal
};
