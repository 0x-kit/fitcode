import types from './types';
import _ from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
  macros: {},
  weightHistory: [],

  goalWeight: {},
  currentWeight: {},

  errorMessage: '',
  loading: true
};

const goalsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: action.payload
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

    case types.FETCH_GOALS_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };

    case types.EDIT_MACROS:
      return {
        ...state,
        macros: { ...action.payload }
      };

    case types.SET_CURRENT_WEIGHT:
      return {
        ...state,
        currentWeight: action.payload.currentWeight.slice(-1)[0],
        weightHistory: action.payload.currentWeight.reverse()
      };

    case types.SET_GOAL_WEIGHT:
      const newGoalWeight = {
        weight: action.payload.goalWeight
      };
      return {
        ...state,
        goalWeight: newGoalWeight
      };

    default:
      return state;
  }
};
export default { goalsReducer };
