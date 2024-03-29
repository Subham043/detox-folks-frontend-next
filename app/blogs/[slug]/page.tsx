import getQueryClient from "@/app/_libs/utils/query/getQueryClient";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import { getBlogQueryOptions } from "@/app/_libs/utils/query/getBlogQuery";
import BlogSection from "./_components/BlogSection";
import { getBlogsQueryOptions } from "@/app/_libs/utils/query/getBlogsQuery";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export const metadata:Metadata = {
  title: 'ParcelCounter | Blog',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default async function BlogDetail({ params }: { params: { slug: string } }) {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getBlogQueryOptions.getBlogQueryKey(params.slug),
        queryFn: () => getBlogQueryOptions.getBlogQueryFn(params.slug),
    })
    
    if(queryClient.getQueryData(getBlogQueryOptions.getBlogQueryKey(params.slug))===undefined) notFound();

    await queryClient.prefetchInfiniteQuery({
        queryKey: getBlogsQueryOptions.getBlogsInfiniteQueryKey,
        queryFn: () => getBlogsQueryOptions.getBlogsQueryFn({pageParam: 1}),
        initialPageParam: getBlogsQueryOptions.getBlogsQueryInitialPageParam,
    })

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <BlogSection slug={params.slug} />
        </HydrationBoundary>
    </>
}