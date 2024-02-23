import Breadcrumb from "@/app/components/Breadcrumb";
import AboutSection from "./AboutSection";
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import getQueryClient from "../utils/data-query/getQueryClient";
import { getAboutQueryOptions } from "../utils/data-query/getAboutQuery";

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