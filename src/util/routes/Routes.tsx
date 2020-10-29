import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ArtistPage from '../../pages/Artist';
import AuthRoute from './AuthRoute';
import LandingPage from '../../pages/Landing';
import LoadingPage from '../../pages/Loading';
import ScrollToTop from '../../components/ScrollToTop';

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
  );
}
