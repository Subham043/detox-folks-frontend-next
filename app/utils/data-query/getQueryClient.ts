import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';
import { QueryClientOptions } from '../constants';

const makeQueryClient = () => new QueryClient(QueryClientOptions)

let browserQueryClient: QueryClient | undefined = undefined

export const getCustomQueryClient = () => {
    if (typeof window === 'undefined') {
      // Server: always make a new query client
      return makeQueryClient()
    } else {
      // Browser: make a new query client if we don't already have one
      // This is very important so we don't re-make a new client if React
      // supsends during the initial render. This may not be needed if we
      // have a suspense boundary BELOW the creation of the query client
      if (!browserQueryClient) browserQueryClient = makeQueryClient()
      return browserQueryClient
    }
}

// cache() is scoped per request, so we don't leak data between requests
// const getCustomQueryClient = cache(() => new QueryClient(QueryClientOptions));
export default cache(()=>getCustomQueryClient());