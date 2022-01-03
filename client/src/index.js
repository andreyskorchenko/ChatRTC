import React from 'react';
import { render } from 'react-dom';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { WSContext } from './context/WSContext';
import App from './App';
import './index.scss';

render(
  <WSContext>
    <App />
  </WSContext>,
  document.getElementById('root')
);