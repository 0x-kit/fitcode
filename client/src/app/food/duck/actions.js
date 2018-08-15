import types from './types';

const fetchError = error => ({ type: types.FETCH_HOME_ERROR, payload: error });

const fetchHome = (mealData, goalData) => ({ type: types.FETCH_HOME, payload: { mealData, goalData } });

const searchProducts = data => ({ type: types.SEARCH_PRODUCTS, payload: data });

const selectProduct = (product, grams) => ({
  type: types.SELECT_PRODUCT,
  payload: { product, grams }
});

const selectMeal = (mealId, part) => ({
  type: types.SELECT_MEAL,
  payload: { mealId, part }
});

const addProduct = data => ({
  type: types.ADD_PRODUCT,
  payload: data
});

const editProduct = data => ({
  type: types.EDIT_PRODUCT,
  payload: data
});

const deleteProduct = data => ({
  type: types.DELETE_PRODUCT,
  payload: data
});

const setDay = date => ({
  type: types.SET_DAY,
  payload: date
});

const addDay = date => ({
  type: types.ADD_DAY,
  payload: date
});

const substractDay = date => ({
  type: types.SUBSTRACT_DAY,
  payload: date
});

export default {
  fetchHome,
  fetchError,
  searchProducts,
  selectProduct,
  selectMeal,
  addProduct,
  editProduct,
  deleteProduct,
  addDay,
  substractDay,
  setDay
};
