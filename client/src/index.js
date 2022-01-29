import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import store from './store';
import App from './App';
import './index.scss';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);