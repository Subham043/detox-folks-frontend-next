import Breadcrumb from "../components/Breadcrumb";
import { getCategoriesQueryOptions } from "../utils/data-query/getCategoriesQuery";
import getQueryClient from "../utils/data-query/getQueryClient";
import Categories from "./Categories";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'

export default async function Category() {
    const queryClient = getQueryClient()

    await queryClient.prefetchInfiniteQuery({
        queryKey: getCategoriesQueryOptions.getCategoriesQueryKey,
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