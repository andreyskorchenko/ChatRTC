import { createStore } from 'redux';
import { AUTH_SIGNIN } from './types';

const initialState = { isAuth: false };

const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      return { ...state, ...action.payload, isAuth: true };
    default:
      return state;
  }
});

export default store;