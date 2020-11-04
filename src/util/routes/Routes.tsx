import React, { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import ArtistPage from '../../pages/Artist';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
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
          <ProtectedRoute exact path="/" component={ArtistPage} />
          <PublicRoute path={PublicRoutes.Landing} component={LandingPage} />
          <ProtectedRoute
            path={ProtectedRoutes.Artist}
            component={ArtistPage}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
