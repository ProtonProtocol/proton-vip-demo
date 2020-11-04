import './styles/global.scss';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import {
  faCheck,
  faPaperPlane,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Routes from './util/routes/Routes';
import React from 'react';

const queryCache = new QueryCache();
library.add(faSearch, faCheck, faPaperPlane);

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Routes />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryCacheProvider>
  );
}
