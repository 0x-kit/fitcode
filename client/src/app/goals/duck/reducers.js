import types from './types';
import _ from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
  fromDate: moment().subtract(4, 'days'),
  toDate: moment(),
  macros: {},
  diaries: [],
  weights: [],

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
      const { macros, currentWeight } = action.payload.data;
      const { date } = action.payload;

      const goalWeight = {
        weight: action.payload.data.goalWeight
      };
      const emptyWeight = {
        date: moment().format('YYYY-MM-DD'),
        weight: null
      };

      const current = _.find(currentWeight, { date: date });
      return {
        ...state,
        macros: macros,
        goalWeight: goalWeight,
        currentWeight: _.isUndefined(current) ? emptyWeight : current
      };

    case types.FETCH_HISTORY:
      return {
        ...state,
        diaries: action.payload.diaries,
        weights: action.payload.weights,
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
      const weights = action.payload.currentWeight.currentWeight;
      const current2 = _.find(weights, { date: action.payload.date });
      return {
        ...state,
        currentWeight: current2,
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

    case types.SET_FROMDATE:
      return {
        ...state,
        fromDate: action.payload
      };

    case types.SET_TODATE:
      return {
        ...state,
        toDate: action.payload
      };

    default:
      return state;
  }
};
export default { goalsReducer };
