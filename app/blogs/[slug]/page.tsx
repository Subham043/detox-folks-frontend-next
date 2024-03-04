import getQueryClient from "@/app/_libs/utils/query/getQueryClient";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import { getBlogQueryOptions } from "@/app/_libs/utils/query/getBlogQuery";
import BlogSection from "./_components/BlogSection";
import { getBlogsQueryOptions } from "@/app/_libs/utils/query/getBlogsQuery";

export default async function BlogDetail({ params }: { params: { slug: string } }) {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getBlogQueryOptions.getBlogQueryKey(params.slug),
        queryFn: () => getBlogQueryOptions.getBlogQueryFn(params.slug),
    })

    await queryClient.prefetchInfiniteQuery({
        queryKey: getBlogsQueryOptions.getBlogsQueryKey,
        queryFn: () => getBlogsQueryOptions.getBlogsQueryFn({pageParam: 1}),
        initialPageParam: getBlogsQueryOptions.getBlogsQueryInitialPageParam,
    })

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <BlogSection slug={params.slug} />
        </HydrationBoundary>
    </>
}