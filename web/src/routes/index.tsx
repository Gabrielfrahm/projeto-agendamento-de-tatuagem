import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import LandPage from '../pages/Landpage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashboardCustomer from '../pages/DashboardCustomer';
import DashboardProvider from '../pages/DashboardProvider';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={LandPage} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route
        path="/dashboardCustomer"
        isPrivate
        component={DashboardCustomer}
      />
      <Route
        path="/dashboardProvider"
        isPrivate
        component={DashboardProvider}
      />
    </Switch>
  );
};

export default Routes;
