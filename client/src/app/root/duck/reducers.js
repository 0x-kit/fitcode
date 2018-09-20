import types from './types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  userInfo: '',
  mainTab: 'food',
  secondaryTab: 'diary',
  activeIndex: 0
};

const TABS = ['food', 'exercise', 'goals'];

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      return { ...state, authenticated: action.payload.token, userInfo: action.payload.userInfo };
    case types.AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case types.MAIN_TAB:
      const newIndex = TABS.findIndex(elem => elem === action.payload);
      return { ...state, mainTab: action.payload, activeIndex: newIndex };
    case types.SECONDARY_TAB:
      return { ...state, secondaryTab: action.payload };
    default:
      return state;
  }
};

export default { authReducer };
