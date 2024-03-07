import { getAboutQueryOptions } from '@/app/_libs/utils/query/getAboutQuery'
import getQueryClient from '@/app/_libs/utils/query/getQueryClient'
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import AboutSection from './AboutSection';

export default async function AboutHydration() {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getAboutQueryOptions.getAboutQueryKey,
        queryFn: getAboutQueryOptions.getAboutQueryFn,
    })

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AboutSection />
        </HydrationBoundary>
    </>
}