// In Next.js, this file would be called: app/providers.jsx
'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { getCustomQueryClient } from '../utils/data-query/getQueryClient';

export default function QueryProviders({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getCustomQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}