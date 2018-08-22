import types from './types';
import moment from 'moment';
import _ from 'lodash';

const INITIAL_STATE = {
  meals: {},
  goals: {},

  products: [],
  userProducts: {},

  selectedProduct: {},
  selectedMeal: {},
  selectedGrams: {},

  loading: true,
  errorMessage: '',
  searchMessage: '',

  date: moment()
};

const foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_HOME:
      return {
        ...state,
        goals: action.payload.goalData,
        meals: _.mapKeys(action.payload.mealData, '_id'),
        loading: false
      };

    case types.FETCH_GOALS:
      return {
        ...state,
        goals: action.payload,
        loading: false
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

    case types.USER_PRODUCTS:
      return {
        ...state,
        userProducts: _.mapKeys(action.payload, '_id'),
        loading: false
      };

    case types.SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };

    case types.SEARCH_PRODUCTS_MESSAGE:
      return {
        ...state,
        searchMessage: action.payload,
        loading: false
      };

    case types.SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload.product,
        selectedGrams: action.payload.grams,
        loading: false
      };

    case types.SELECT_MEAL:
      return {
        ...state,
        selectedMeal: action.payload,
        loading: false
      };

    case types.EDIT_DIARY_PRODUCT:
      return {
        ...state,
        meals: { ...state.meals, ..._.mapKeys(action.payload, '_id') },
        loading: false
      };

    case types.DELETE_DIARY_PRODUCT:
      return {
        ...state,
        meals: { ...state.meals, ..._.mapKeys(action.payload, '_id') },
        loading: false
      };

    case types.ADD_DAY:
      return {
        ...state,
        date: action.payload,
        loading: false
      };

    case types.SUBSTRACT_DAY:
      return {
        ...state,
        date: action.payload,
        loading: false
      };

    case types.SET_DAY:
      return {
        ...state,
        date: action.payload
      };

    case types.EDIT_PERSONAL_PRODUCT:
      return {
        ...state,
        userProducts: { ...state.userProducts, ..._.mapKeys(action.payload, '_id') },
        loading: false
      };

    case types.DELETE_PERSONAL_PRODUCT:
      return {
        ...state,
        userProducts: _.omit(state.userProducts, action.payload),
        loading: false
      };

    case types.ADD_PERSONAL_PRODUCT:
      return {
        ...state,
        userProducts: { ...state.userProducts, ..._.mapKeys(action.payload, '_id') },
        loading: false
      };

    default:
      return state;
  }
};
export default { foodReducer };
