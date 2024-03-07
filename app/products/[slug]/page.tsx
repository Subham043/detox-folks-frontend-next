import getQueryClient from "@/app/_libs/utils/query/getQueryClient"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import DetailSection from "./_components/DetailSection"
import { getProductQueryOptions } from "@/app/_libs/utils/query/getProductQuery"
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export default async function ProductDetail({ params }: { params: { slug: string } }) {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getProductQueryOptions.getProductQueryKey(params.slug),
        queryFn: () => getProductQueryOptions.getProductQueryFn(params.slug),
    })

    if(queryClient.getQueryData(getProductQueryOptions.getProductQueryKey(params.slug))===undefined) notFound();

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DetailSection params={params} />
        </HydrationBoundary>
    </>
}