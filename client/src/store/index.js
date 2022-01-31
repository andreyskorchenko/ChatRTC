import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '~/store/reducers/authReducer';
import preloadersReducer from '~/store/reducers/preloadersReducer';

const store = createStore(
  combineReducers({
    auth: authReducer,
    preloaders: preloadersReducer
  }), compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;