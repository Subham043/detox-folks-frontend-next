import { Metadata } from "next";
import Breadcrumb from "../_libs/components/Breadcrumb";
import { getCategoriesQueryOptions } from "../_libs/utils/query/getCategoriesQuery";
import getQueryClient from "../_libs/utils/query/getQueryClient";
import Categories from "./_components/Categories";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export const metadata:Metadata = {
  title: 'ParcelCounter | Category',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default async function Category() {
    const queryClient = getQueryClient()

    await queryClient.prefetchInfiniteQuery({
        queryKey: getCategoriesQueryOptions.getCategoriesInfiniteQueryKey,
        queryFn: () => getCategoriesQueryOptions.getCategoriesQueryFn({pageParam: 1}),
        initialPageParam: getCategoriesQueryOptions.getCategoriesQueryInitialPageParam,
    })

    return <>
        <Breadcrumb name="Category" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Categories />
                </HydrationBoundary>
            </div>
        </div>
    </>
}