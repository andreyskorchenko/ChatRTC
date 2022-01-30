import { AUTH_SIGNIN } from '../types';

const initialState = { isAuth: false };
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      return { ...state, ...action.payload, isAuth: true };
    default:
      return state;
  }
};

export default authReducer;