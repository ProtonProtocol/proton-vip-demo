import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { Suspense } from 'react'

import ArtistPage from './pages/artist'
import AuthRoute from './AuthRoute'
import LandingPage from './pages/landing'
import LoadingPage from './pages/loading'
import ScrollToTop from './shared/components/ScrollToTop'

export enum ProtectedRoutes {
  Artist = '/artist',
}

export enum PublicRoutes {
  Landing = '/landing',
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <AuthRoute exact path="/">
            <ArtistPage />
          </AuthRoute>
          <Route path={PublicRoutes.Landing}>
            <LandingPage />
          </Route>
          <AuthRoute path={ProtectedRoutes.Artist}>
            <ArtistPage />
          </AuthRoute>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
