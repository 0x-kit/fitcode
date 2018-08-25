import types from './types';

const loading = flag => ({
  type: types.LOADING,
  payload: flag
});

const fetchError = error => ({ type: types.FETCH_HOME_ERROR, payload: error });

const setMeals = meals => ({
  type: types.SET_MEALS,
  payload: meals
});

const setMacros = macros => ({
  type: types.SET_MACROS,
  payload: macros
});

const getUserProducts = data => ({ type: types.USER_PRODUCTS, payload: data });

const searchProducts = data => ({ type: types.SEARCH_PRODUCTS, payload: data });

const searchProductsMessage = message => ({ type: types.SEARCH_PRODUCTS_MESSAGE, payload: message });

const selectProduct = (product, grams = 100) => ({
  type: types.SELECT_PRODUCT,
  payload: { product, grams }
});

const selectMeal = (mealId, part) => ({
  type: types.SELECT_MEAL,
  payload: { mealId, part }
});

const addDiaryProduct = data => ({
  type: types.ADD_DIARY_PRODUCT,
  payload: data
});

const editDiaryProduct = data => ({
  type: types.EDIT_DIARY_PRODUCT,
  payload: data
});

const deleteDiaryProduct = data => ({
  type: types.DELETE_DIARY_PRODUCT,
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

const addPersonalProduct = data => ({
  type: types.ADD_PERSONAL_PRODUCT,
  payload: data
});

const editPersonalProduct = data => ({
  type: types.EDIT_PERSONAL_PRODUCT,
  payload: data
});

const deletePersonalProduct = data => ({
  type: types.DELETE_PERSONAL_PRODUCT,
  payload: data
});

export default {
  loading,
  fetchError,
  setMeals,
  setMacros,

  getUserProducts,
  searchProducts,
  searchProductsMessage,

  selectProduct,
  selectMeal,

  addDiaryProduct,
  editDiaryProduct,
  deleteDiaryProduct,

  addDay,
  substractDay,
  setDay,

  addPersonalProduct,
  editPersonalProduct,
  deletePersonalProduct
};
