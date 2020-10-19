import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { PublicRoutes } from './Routes'
import { authContext } from './shared/providers/AuthProvider'

interface Props {
  children: JSX.Element
  path: string
  exact?: boolean
}

const AuthRoute = ({ children, ...rest }: Props) => {
  const { currentUser } = useContext(authContext)
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
  )
}

export default AuthRoute
