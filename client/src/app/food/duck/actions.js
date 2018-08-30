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

const setExerciseCals = cals => ({
  type: types.SET_EXERCISE_CALS,
  payload: cals
});

const getUserProducts = data => ({ type: types.USER_PRODUCTS, payload: data });

const getRecentProducts = data => ({ type: types.RECENT_PRODUCTS, payload: data });

const searchProducts = (products, message) => ({ type: types.SEARCH_PRODUCTS, payload: { products, message } });

const resetMessage = message => ({ type: types.RESET_MESSAGE, payload: message });

const resetSearchMessage = (message = '') => ({ type: types.RESET_SEARCH_MESSAGE, payload: message });

const selectProduct = (product, grams = 100) => ({
  type: types.SELECT_PRODUCT,
  payload: { product, grams }
});

const selectMeal = (mealId, part) => ({
  type: types.SELECT_MEAL,
  payload: { mealId, part }
});

const addDiaryProduct = message => ({
  type: types.ADD_DIARY_PRODUCT,
  payload: message
});

const editDiaryProduct = (diary, message) => ({
  type: types.EDIT_DIARY_PRODUCT,
  payload: { diary, message }
});

const deleteDiaryProduct = (diary, message) => ({
  type: types.DELETE_DIARY_PRODUCT,
  payload: { diary, message }
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

const addPersonalProduct = (product, message) => ({
  type: types.ADD_PERSONAL_PRODUCT,
  payload: { product, message }
});

const editPersonalProduct = (product, message) => ({
  type: types.EDIT_PERSONAL_PRODUCT,
  payload: { product, message }
});

const deletePersonalProduct = (product, message) => ({
  type: types.DELETE_PERSONAL_PRODUCT,
  payload: { product, message }
});

export default {
  loading,
  fetchError,
  setMeals,
  setMacros,
  setExerciseCals,

  getUserProducts,
  getRecentProducts,
  searchProducts,

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
  deletePersonalProduct,
  resetMessage,
  resetSearchMessage
};
