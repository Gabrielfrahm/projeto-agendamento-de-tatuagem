import React from 'react';
import {
  RouteProps as ReactDomRouterProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDomRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboardProvider',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
