import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import LandPage from '../pages/Landpage';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={LandPage} />
      <Route path="/signin" component={SignIn} />
    </Switch>
  );
};

export default Routes;
