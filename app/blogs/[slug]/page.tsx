import getQueryClient from "@/app/_libs/utils/query/getQueryClient";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import { getBlogQueryOptions } from "@/app/_libs/utils/query/getBlogQuery";
import BlogSection from "./_components/BlogSection";

export default async function BlogDetail({ params }: { params: { slug: string } }) {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getBlogQueryOptions.getBlogQueryKey(params.slug),
        queryFn: () => getBlogQueryOptions.getBlogQueryFn(params.slug),
    })

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <BlogSection slug={params.slug} />
        </HydrationBoundary>
    </>
}