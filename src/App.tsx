import './App.scss';

import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { faCheck, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons'

import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools'
import Routes from './Routes'
import { library } from '@fortawesome/fontawesome-svg-core'

const queryCache = new QueryCache()
library.add(faSearch, faCheck, faPaperPlane)

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Routes />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryCacheProvider>
  )
}
