import Banner from "@/app/components/Banner";
import Categories from "./home/Categories";
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import getQueryClient from "./utils/data-query/getQueryClient";
import { getCategoriesQueryOptions } from "./utils/data-query/getCategoriesQuery";

export default async function Home() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
      queryKey: getCategoriesQueryOptions.getCategoriesQueryKey,
      queryFn: () => getCategoriesQueryOptions.getCategoriesQueryFn({pageParam: 1})
  })
  return (
      <>
        <Banner />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Categories />
        </HydrationBoundary>
      </>
  );
}
