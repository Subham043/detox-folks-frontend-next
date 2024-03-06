import Banner from "@/app/_libs/components/Banner";
import Categories from "./_home/Categories";
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import getQueryClient from "./_libs/utils/query/getQueryClient";
import { getCategoriesQueryOptions } from "./_libs/utils/query/getCategoriesQuery";
import ProductSection from "./_home/ProductSection";
import Testimonials from "./_home/Testimonials";

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
        <ProductSection slug="is_featured" />
        <ProductSection slug="is_new" />
        <ProductSection slug="is_on_sale" />
        <Testimonials />
      </>
  );
}
