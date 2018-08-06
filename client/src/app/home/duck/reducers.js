import types from './types';
import _ from 'lodash';
import { reducer as searchFormReducer } from 'redux-form';

const INITIAL_STATE = {
  meals: [],
  goals: {},
  products: [],
  selectedProduct: {},
  selectedMeal: {},
  loading: true,
  errorMessage: ''
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_GOALS:
      return {
        ...state,
        goals: action.payload
      };
    case types.FETCH_MEALS:
      return {
        ...state,
        meals: _.mapKeys(action.payload, '_id'),
        loading: false
      };
    case types.FETCH_HOME_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case types.SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case types.SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload,
        loading: false
      };
    case types.SELECT_MEAL:
      return {
        ...state,
        selectedMeal: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default { homeReducer, searchFormReducer };
