import { PRELOADER_SIGNIN_SHOW, PRELOADER_SIGNIN_HIDE } from '~/store/types';

const initialState = { signin: false };
const preloadersReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRELOADER_SIGNIN_SHOW:
      return { ...state, signin: true };
    case PRELOADER_SIGNIN_HIDE:
      return { ...state, signin: false };
    default:
      return state;
  }
};

export default preloadersReducer;