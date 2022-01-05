import React from 'react';

import {
  HashRouter as Router,
  Switch, Route
} from 'react-router-dom';

import Signin from '~/pages/Signin';
import Room from '~/pages/Room';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Signin} />
        <Route path='/room' component={Room} />
      </Switch>
    </Router>
  );
};

export default App;