import getQueryClient from "@/app/_libs/utils/query/getQueryClient";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import LegalSection from "./LegalSection";
import { getLegalQueryOptions } from "@/app/_libs/utils/query/getLegalQuery";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export const metadata:Metadata = {
  title: 'ParcelCounter | Legal',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default async function Legal({ params }: { params: { slug: string } }) {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getLegalQueryOptions.getLegalQueryKey(params.slug),
        queryFn: () => getLegalQueryOptions.getLegalQueryFn(params.slug),
    })

    if(queryClient.getQueryData(getLegalQueryOptions.getLegalQueryKey(params.slug))===undefined) notFound();

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LegalSection slug={params.slug} />
        </HydrationBoundary>
    </>
}