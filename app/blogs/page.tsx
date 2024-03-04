import Breadcrumb from "../_libs/components/Breadcrumb";
import { getBlogsQueryOptions } from "../_libs/utils/query/getBlogsQuery";
import getQueryClient from "../_libs/utils/query/getQueryClient";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import BlogsList from "./_components/BlogsList";

export default async function Blogs() {
    const queryClient = getQueryClient()

    await queryClient.prefetchInfiniteQuery({
        queryKey: getBlogsQueryOptions.getBlogsQueryKey,
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