import { AUTH_CHECK, AUTH_SIGNIN } from '~/store/types';

const initialState = { isAuth: false };
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHECK:
      return { ...state, ...action.payload, isAuth: true };
    case AUTH_SIGNIN:
      return { ...state, ...action.payload, isAuth: true };
    default:
      return state;
  }
};

export default authReducer;