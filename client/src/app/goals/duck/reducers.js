import types from './types';
import _ from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
  macros: {},
  weightHistory: [],

  goalWeight: '',
  currentWeight: {},

  errorMessage: '',
  loading: true
};

const goalsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_GOALS:
      return {
        ...state,
        macros: { ...action.payload.macros },
        goalWeight: action.payload.goalWeight,
        currentWeight: action.payload.currentWeight.slice(-1)[0],
        weightHistory: action.payload.currentWeight,
        loading: false
      };

    case types.FETCH_GOALS_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };

    case types.EDIT_MACROS:
      return {
        ...state,
        macros: { ...action.payload },
        loading: false
      };

    default:
      return state;
  }
};
export default { goalsReducer };
