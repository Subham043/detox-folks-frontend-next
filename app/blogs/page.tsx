import Breadcrumb from "../_libs/components/Breadcrumb";
import { getBlogsQueryOptions } from "../_libs/utils/query/getBlogsQuery";
import getQueryClient from "../_libs/utils/query/getQueryClient";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import BlogsList from "./_components/BlogsList";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export const metadata:Metadata = {
  title: 'ParcelCounter | Blogs',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default async function Blogs() {
    const queryClient = getQueryClient()

    await queryClient.prefetchInfiniteQuery({
        queryKey: getBlogsQueryOptions.getBlogsInfiniteQueryKey,
        queryFn: () => getBlogsQueryOptions.getBlogsQueryFn({pageParam: 1}),
        initialPageParam: getBlogsQueryOptions.getBlogsQueryInitialPageParam,
    })

    return <>
        <Breadcrumb name="Blogs" />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <BlogsList />
        </HydrationBoundary>
    </>
}