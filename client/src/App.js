import React from 'react';

import {
  HashRouter as Router,
  Switch, Route
} from 'react-router-dom';

import Join from '~/pages/Join';
import Room from '~/pages/Room';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Join} />
        <Route path='/room' component={Room} />
      </Switch>
    </Router>
  );
};

export default App;