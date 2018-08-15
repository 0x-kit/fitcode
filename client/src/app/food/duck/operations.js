import ActionCreators from './actions';
import axios from 'axios';

const {
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
} = ActionCreators;

const complexFetchHome = date => async dispatch => {
  try {
    const fDate = date.format('YYYY-MM-DD');

    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const goals = await axios.get(`/api/user/${userId}/goals`, reqConfig);

    const meals = await axios.get(`/api/diary/user/${userId}?date=${fDate}`, reqConfig);

    dispatch(fetchHome(meals.data, goals.data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexSearchProducts = term => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(`/api/product/search?like=${term}`, reqConfig);

    dispatch(searchProducts(response.data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexAddProducts = (mealId, product) => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.post(`/api/diary/${mealId}/product`, product, reqConfig);

    dispatch(addProduct(response.data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEditProducts = (mealId, product) => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/diary/${mealId}/product`, product, reqConfig);

    dispatch(editProduct(response.data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexDeleteProducts = (mealId, product) => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const reqConfig = { headers: { authorization: token } };

    const productId = product.product;

    const response = await axios.delete(`/api/diary/${mealId}/product/${productId}`, reqConfig);

    dispatch(deleteProduct(response.data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexAddDay = date => async dispatch => dispatch(addDay(date));

const complexSubstractDay = date => async dispatch => dispatch(substractDay(date));

const complexSetDay = date => async dispatch => dispatch(setDay(date));

export default {
  complexFetchHome,
  complexSearchProducts,
  selectProduct,
  selectMeal,
  complexAddProducts,
  complexEditProducts,
  complexDeleteProducts,
  complexAddDay,
  complexSubstractDay,
  complexSetDay
};
