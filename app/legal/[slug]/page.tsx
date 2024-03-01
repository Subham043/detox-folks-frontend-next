import getQueryClient from "@/app/_libs/utils/query/getQueryClient";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import LegalSection from "./LegalSection";
import { getLegalQueryOptions } from "@/app/_libs/utils/query/getLegalQuery";

export default async function About({ params }: { params: { slug: string } }) {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getLegalQueryOptions.getLegalQueryKey(params.slug),
        queryFn: () => getLegalQueryOptions.getLegalQueryFn(params.slug),
    })

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LegalSection slug={params.slug} />
        </HydrationBoundary>
    </>
}