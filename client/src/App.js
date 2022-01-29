import React from 'react';
import { useSelector } from 'react-redux';

import {
  HashRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom';

import Signin from '~/pages/Signin';
import Room from '~/pages/Room';

const App = () => {
  const { isAuth } = useSelector(state => state);

  return isAuth ? (
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