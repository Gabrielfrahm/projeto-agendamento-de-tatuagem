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
import ProfileCustomer from '../pages/ProfileCustomer';
import ProfileProvider from '../pages/ProfileProvider';

import CreateAppointment from '../pages/CreateAppointment';

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
        path="/createAppointment"
        isPrivate
        component={CreateAppointment}
      />

      <Route
        path="/dashboardProvider"
        isPrivate
        component={DashboardProvider}
      />

      <Route path="/customers/profile" isPrivate component={ProfileCustomer} />
      <Route path="/providers/profile" isPrivate component={ProfileProvider} />
    </Switch>
  );
};

export default Routes;
