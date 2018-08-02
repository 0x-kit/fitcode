import types from './types';
import _ from 'lodash';

const INITIAL_STATE = {
  meals: [],
  goals: {},
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
    default:
      return state;
  }
};

export default homeReducer;
