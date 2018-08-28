import types from './types';
import _ from 'lodash';
// import moment from 'moment';

const INITIAL_STATE = {
  userExercises: {},
  selectedExercise: {},
  exerciseCals: { calories: 0 },

  errorMessage: '',
  loading: true
};

const exerciseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case types.SELECT_EXERCISE:
      return {
        ...state,
        selectedExercise: action.payload
      };

    case types.FETCH_EXERCISES:
      let calories = 0;
      if (!_.isEmpty(action.payload)) {
        action.payload.forEach(ex => (calories += ex.calories));
      }
      return {
        ...state,
        exerciseCals: { calories },
        userExercises: _.mapKeys(action.payload, '_id')
      };

    case types.ADD_EXERCISE:
      return {
        ...state,
        userExercises: { ...state.userExercises, ..._.mapKeys(action.payload, '_id') }
      };

    case types.EDIT_EXERCISE:
      return {
        ...state,
        userExercises: { ...state.userExercises, ..._.mapKeys(action.payload, '_id') }
      };

    case types.DELETE_EXERCISE:
      return {
        ...state,
        userExercises: _.omit(state.userExercises, action.payload)
      };

    case types.FETCH_EXERCISE_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
export default { exerciseReducer };
