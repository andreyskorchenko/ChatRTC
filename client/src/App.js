import React from 'react';

import {
  HashRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom';

import Signin from '~/pages/Signin';
import Room from '~/pages/Room';

const isAuto = false;

const App = () => {
  return isAuto ? (
    <Router>
      <Switch>
        <Route exact path="/room" component={Room} />
        <Redirect to="/room" />
      </Switch>
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Redirect to="/signin" />
      </Switch>
    </Router>
  );
};

export default App;