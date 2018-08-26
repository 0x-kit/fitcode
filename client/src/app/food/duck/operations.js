import ActionCreators from './actions';
import axios from 'axios';
// import _ from 'lodash';
import { isUndefined } from 'util';

const {
  loading,
  fetchError,
  setMacros,
  setMeals,
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
} = ActionCreators;

const complexFetchHome = date => async dispatch => {
  try {
    const fDate = date.format('YYYY-MM-DD');

    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const goals = await axios.get(`/api/user/${userId}/goals`, reqConfig);

    const meals = await axios.get(`/api/diary/user/${userId}?date=${fDate}`, reqConfig);

    dispatch(setMeals(meals.data));

    dispatch(setMacros(goals.data.macros));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexSearchProducts = (term, loadUserProducts = false) => async dispatch => {
  try {
    let response,
      count,
      message = '';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const reqConfig = { headers: { authorization: token } };

    if (loadUserProducts) {
      response = await axios.get(`/api/product/user/${userId}`, reqConfig);

      dispatch(searchProducts(response.data));
    } else {
      response = await axios.get(`/api/product/search?like=${term}`, reqConfig);
      count = response.data.length;

      if (count === 0) {
        message = 'Not found';
      } else {
        message = `${count} products found`;
        dispatch(searchProducts(response.data));
      }
    }

    dispatch(searchProductsMessage(message));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexAddDiaryProduct = (mealId, diaryProduct, user) => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    //register this product as user's
    if (isUndefined(user)) await axios.put(`/api/product/${diaryProduct.product}`, { user: userId }, reqConfig);

    const response = await axios.post(`/api/diary/${mealId}/product`, diaryProduct, reqConfig);

    dispatch(addDiaryProduct(response.data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEditDiaryProduct = (mealId, product) => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/diary/${mealId}/product`, product, reqConfig);

    dispatch(editDiaryProduct(response.data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexDeleteDiaryProduct = (mealId, product) => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const productId = product.product;

    const response = await axios.delete(`/api/diary/${mealId}/product/${productId}`, reqConfig);

    dispatch(deleteDiaryProduct(response.data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexAddDay = date => async dispatch => dispatch(addDay(date));

const complexSubstractDay = date => async dispatch => dispatch(substractDay(date));

const complexSetDay = date => async dispatch => dispatch(setDay(date));

const complexGetUserProducts = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(`/api/product/user/${userId}`, reqConfig);

    // const count = response.data.length;
    // const message = count === 0 ? 'Not found' : `${count} products found`;

    dispatch(getUserProducts(response.data));
    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEditPersonalProduct = (productId, product) => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/product/${productId}`, product, reqConfig);

    dispatch(editPersonalProduct([response.data]));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexDeletePersonalProduct = (productId, product) => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/product/${productId}`, product, reqConfig);

    dispatch(deletePersonalProduct(response.data._id));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexAddPersonalProduct = product => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.post('/api/product/', product, reqConfig);

    dispatch(addPersonalProduct([response.data]));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export default {
  complexFetchHome,
  complexGetUserProducts,
  complexSearchProducts,
  selectProduct,
  selectMeal,

  complexAddDiaryProduct,
  complexEditDiaryProduct,
  complexDeleteDiaryProduct,

  complexAddDay,
  complexSubstractDay,
  complexSetDay,

  complexEditPersonalProduct,
  complexDeletePersonalProduct,
  complexAddPersonalProduct
};
