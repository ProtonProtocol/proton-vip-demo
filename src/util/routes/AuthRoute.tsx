import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { PublicRoutes } from './Routes';
import { useAuthContext } from '../providers/AuthProvider';

interface Props {
  children: JSX.Element
  path: string
  exact?: boolean
}

const AuthRoute = ({ children, ...rest }: Props) => {
  const { currentUser } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser && currentUser.isMember ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: PublicRoutes.Landing,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
