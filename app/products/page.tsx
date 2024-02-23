import Breadcrumb from "../components/Breadcrumb";
import { getProductsQueryOptions } from "../utils/data-query/getProductsQuery";
import getQueryClient from "../utils/data-query/getQueryClient";
import Categories from "./Categories";
import ProductSection from "./Products";
import {
    dehydrate,
    HydrationBoundary,
  } from '@tanstack/react-query'

export default async function Products() {
    const queryClient = getQueryClient()

    await queryClient.prefetchInfiniteQuery({
        queryKey: getProductsQueryOptions.getProductsInfiniteQueryKey,
        queryFn: () => getProductsQueryOptions.getProductsQueryFn({pageParam: 1}),
        initialPageParam: getProductsQueryOptions.getProductsQueryInitialPageParam,
    })

    return <>
        <Breadcrumb name="Products" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="w-full max-w-full flex flex-wrap justify-between items-start gap-5">
                    <div className=" w-1/5 shrink-0 sticky top-8">
                        <Categories />
                    </div>
                    <div className=" flex-1 shrink-0">
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            <ProductSection />
                        </HydrationBoundary>
                    </div>
                </div>
            </div>
        </div>
    </>
}