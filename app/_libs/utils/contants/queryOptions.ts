import { InfiniteData, QueryClientConfig } from "@tanstack/react-query";

export const QueryClientOptions:QueryClientConfig = {
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchInterval: false,
        retry: 2,
        retryDelay: 3000,
      },
    },
}

export const getQueryInitialPageParam = 1;

export const getQueryTotalCount = 20;

export const getQuerySelect = <T>(data:InfiniteData<T|any, number>) => {
  return {
      ...data,
      pages: data.pages.flatMap((page) => page.data),
  }
}

export const getQueryNextPageParam = <T>(lastPage:T|any, allPages:T[]|any[]) => {
  const morePagesExist =
      allPages.flatMap((page) => page.data).length !==
      lastPage.meta.total;
  if (morePagesExist) {
      return allPages.length + 1;
  }
  return undefined;
}