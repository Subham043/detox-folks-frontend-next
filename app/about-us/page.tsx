import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import AboutSection from "./_components/AboutSection";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import getQueryClient from "../_libs/utils/query/getQueryClient";
import { getAboutQueryOptions } from "../_libs/utils/query/getAboutQuery";

export default async function About() {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getAboutQueryOptions.getAboutQueryKey,
        queryFn: getAboutQueryOptions.getAboutQueryFn,
    })

    return <>
        <Breadcrumb name="About Us" />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AboutSection />
        </HydrationBoundary>
    </>
}