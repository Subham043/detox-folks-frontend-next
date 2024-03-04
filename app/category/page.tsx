import Breadcrumb from "../_libs/components/Breadcrumb";
import { getCategoriesQueryOptions } from "../_libs/utils/query/getCategoriesQuery";
import getQueryClient from "../_libs/utils/query/getQueryClient";
import Categories from "./_components/Categories";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'

export default async function Category() {
    const queryClient = getQueryClient()

    await queryClient.prefetchInfiniteQuery({
        queryKey: getCategoriesQueryOptions.getCategoriesInfiniteQueryKey,
        queryFn: () => getCategoriesQueryOptions.getCategoriesQueryFn({pageParam: 1}),
        initialPageParam: getCategoriesQueryOptions.getCategoriesQueryInitialPageParam,
    })

    return <>
        <Breadcrumb name="Category" />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Categories />
        </HydrationBoundary>
    </>
}