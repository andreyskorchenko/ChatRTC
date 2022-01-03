import React from 'react';

import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom';

import Join from '~/pages/Join';
import Room from '~/pages/Room';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Join} />
        <Route path='/room' component={Room} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
};

export default App;