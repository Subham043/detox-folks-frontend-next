import { getCategoriesQueryOptions } from "../../_libs/utils/query/getCategoriesQuery";
import { getCategoryQueryOptions } from "../../_libs/utils/query/getCategoryQuery";
import { getProductsQueryOptions } from "../../_libs/utils/query/getProductsQuery";
import getQueryClient from "../../_libs/utils/query/getQueryClient";
import Categories from "./Categories";
import DisplaySection from "./DisplaySection";
import {
    dehydrate,
    HydrationBoundary,
  } from '@tanstack/react-query'

export default async function MainSection({
    searchParams
  }: {
    searchParams?: { 
        category: string | undefined 
    };
  }) {

    const queryClient = getQueryClient()

    if(searchParams && searchParams.category && searchParams.category.length!==0){
        const category = searchParams.category;
        await queryClient.prefetchQuery({
            queryKey: getCategoryQueryOptions.getCategoryQueryKey(category),
            queryFn: () => getCategoryQueryOptions.getCategoryQueryFn(category),
        })
        // const categoryQueryData = queryClient.getQueryData(getCategoryQueryOptions.getCategoryQueryKey(category))
    }else{
        await queryClient.prefetchInfiniteQuery({
            queryKey: getProductsQueryOptions.getProductsInfiniteQueryKey,
            queryFn: () => getProductsQueryOptions.getProductsQueryFn({pageParam: 1}),
            initialPageParam: getProductsQueryOptions.getProductsQueryInitialPageParam,
        })
    }
    
    await queryClient.prefetchInfiniteQuery({
        queryKey: getCategoriesQueryOptions.getCategoriesInfiniteQueryKey,
        queryFn: () => getCategoriesQueryOptions.getCategoriesQueryFn({pageParam: 1}),
        initialPageParam: getCategoriesQueryOptions.getCategoriesQueryInitialPageParam,
    })

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="w-full py-10">
                <div className="container mx-auto">
                    <div className="w-full max-w-full flex flex-wrap justify-between items-start gap-5">
                        <div className=" w-1/5 shrink-0 sticky top-8">
                            <Categories />
                        </div>
                        <div className=" flex-1 shrink-0">
                            <DisplaySection searchParams={searchParams} />
                        </div>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    </>
}