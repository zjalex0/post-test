import { types } from '@types';

const initialState = {
  checking: true,
  registered: false,
  loandingAuth: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        loandingAuth: false,
        checking: false
      };
    case types.authLogout:
      return {
        loandingAuth: false,
        checking: false
      };
    case types.authRegistered:
      return {
        loandingAuth: false,
        registered: action.payload
      };
    case types.loandingAuth:
      return {
        ...state,
        loandingAuth: action.payload
      };
    default:
      return state;
  }
};
