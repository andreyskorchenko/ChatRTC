import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { authCheck } from '@/store/actions/authActions';
import Signin from '@/pages/Signin';
import Room from '@/pages/Room';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(authCheck()), []);
  const { isAuth } = useSelector(({ auth }) => auth);

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
