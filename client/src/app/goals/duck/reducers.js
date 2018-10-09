import types from './types';
import _ from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
  macros: {},
  history: {},
  weightHistory: [],

  goalWeight: {},
  currentWeight: {},

  errorMessage: '',
  message: '',
  loading: true
};

const goalsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case types.RESET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };

    case types.FETCH_GOALS:
      const { macros, currentWeight } = action.payload;
      const goalWeight = {
        weight: action.payload.goalWeight
      };
      const emptyWeight = {
        date: moment().format('YYYY-MM-DD'),
        weight: null
      };
      return {
        ...state,
        macros: macros,
        goalWeight: goalWeight,
        currentWeight: !_.isEmpty(currentWeight) ? currentWeight.slice(-1)[0] : emptyWeight,
        weightHistory: currentWeight.reverse()
      };

    case types.FETCH_HISTORY:
      return {
        ...state,
        history: _.mapKeys(action.payload, '_id'),
        errorMessage: action.payload
      };

    case types.FETCH_GOALS_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };

    case types.EDIT_MACROS:
      return {
        ...state,
        macros: { ...action.payload.macros },
        message: action.payload.message
      };

    case types.SET_CURRENT_WEIGHT:
      return {
        ...state,
        currentWeight: action.payload.currentWeight.currentWeight.slice(-1)[0],
        weightHistory: action.payload.currentWeight.currentWeight.reverse(),
        message: action.payload.message
      };

    case types.SET_GOAL_WEIGHT:
      const newGoalWeight = {
        weight: action.payload.goalWeight.goalWeight
      };
      return {
        ...state,
        goalWeight: newGoalWeight,
        message: action.payload.message
      };

    default:
      return state;
  }
};
export default { goalsReducer };
