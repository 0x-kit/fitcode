import types from './types';
import moment from 'moment';
import _ from 'lodash';

const INITIAL_STATE = {
  meals: {},
  macros: {},
  exerciseCals: { calories: 0 },

  products: [],
  userProducts: {},

  selectedProduct: {},
  selectedMeal: {},
  selectedGrams: {},

  loading: true,
  errorMessage: '',
  searchMessage: '',
  message: '',

  date: moment()
};

const foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /*** food/diary ***/
    case types.LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case types.SET_MEALS:
      return {
        ...state,
        meals: _.mapKeys(action.payload, '_id')
      };

    case types.SET_MACROS:
      return {
        ...state,
        macros: action.payload
      };

    case types.ADD_DAY:
      return {
        ...state,
        date: action.payload
      };

    case types.SUBSTRACT_DAY:
      return {
        ...state,
        date: action.payload
      };

    case types.SET_DAY:
      return {
        ...state,
        date: action.payload
      };

    case types.ADD_DIARY_PRODUCT:
      return {
        ...state,
        message: action.payload
      };

    case types.EDIT_DIARY_PRODUCT:
      return {
        ...state,
        meals: { ...state.meals, ..._.mapKeys(action.payload.diary, '_id') },
        message: action.payload.message
      };

    case types.DELETE_DIARY_PRODUCT:
      return {
        ...state,
        meals: { ...state.meals, ..._.mapKeys(action.payload.diary, '_id') },
        message: action.payload.message
      };

    case types.SELECT_MEAL:
      return {
        ...state,
        selectedMeal: action.payload
      };

    case types.FETCH_HOME_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    /*** end food/diary ***/

    /*** food/diary/add ***/
    case types.USER_PRODUCTS:
      return {
        ...state,
        userProducts: _.mapKeys(action.payload, '_id')
      };

    case types.RECENT_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case types.SEARCH_PRODUCTS:
      const products = action.payload.products.length !== 0 ? action.payload.products : state.products;

      return {
        ...state,
        products: products,
        searchMessage: action.payload.message
      };

    case types.RESET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };

    case types.SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload.product,
        selectedGrams: action.payload.grams
      };
    /*** end food/diary/add ***/

    /*** food/mine ***/
    case types.EDIT_PERSONAL_PRODUCT:
      return {
        ...state,
        userProducts: { ...state.userProducts, ..._.mapKeys(action.payload.product, '_id') },
        message: action.payload.message
      };

    case types.DELETE_PERSONAL_PRODUCT:
      return {
        ...state,
        userProducts: _.omit(state.userProducts, action.payload.product),
        message: action.payload.message
      };

    case types.ADD_PERSONAL_PRODUCT:
      return {
        ...state,
        userProducts: { ...state.userProducts, ..._.mapKeys(action.payload.product, '_id') },
        message: action.payload.message
      };
    /*** end food/mine ***/

    case types.SET_EXERCISE_CALS:
      let calories = 0;
      if (!_.isEmpty(action.payload)) {
        action.payload.forEach(ex => (calories += ex.calories));
      }

      return {
        ...state,
        exerciseCals: { calories }
      };

    default:
      return state;
  }
};
export default { foodReducer };
