import { CategoryType } from "@/app/_libs/utils/types";
import { getCategoriesQueryOptions } from "../../../_libs/utils/query/getCategoriesQuery";
import { getCategoryQueryOptions } from "../../../_libs/utils/query/getCategoryQuery";
import { getProductsQueryOptions } from "../../../_libs/utils/query/getProductsQuery";
import getQueryClient from "../../../_libs/utils/query/getQueryClient";
import DisplaySection from "./DisplaySection";
import {
    dehydrate,
    HydrationBoundary,
  } from '@tanstack/react-query'
import CategoryContainer from "../Categories/CategoryContainer";

export default async function MainSection({
    searchParams
  }: {
    searchParams?: { 
        category: string | undefined,
        category_id: string | undefined,
        sub_category: string | undefined,
        sub_category_id: string | undefined,
    };
  }) {

    const queryClient = getQueryClient()
    const category = searchParams && searchParams.category && searchParams.category.length!==0 ? searchParams.category : ''; 
    const sub_category = searchParams && searchParams.sub_category && searchParams.sub_category.length!==0 ? searchParams.sub_category : ''; 
    const category_id = searchParams && searchParams.category_id && searchParams.category_id.length!==0 ? searchParams.category_id : ''; 
    const sub_category_id = searchParams && searchParams.sub_category_id && searchParams.sub_category_id.length!==0 ? searchParams.sub_category_id : '';

    if(category.length>0 && sub_category.length===0){
        await queryClient.prefetchQuery({
            queryKey: getCategoryQueryOptions.getCategoryQueryKey(category),
            queryFn: () => getCategoryQueryOptions.getCategoryQueryFn(category),
        })
        const categoryQueryData = queryClient.getQueryData(getCategoryQueryOptions.getCategoryQueryKey(category))
        if(categoryQueryData){
            const categoryData = categoryQueryData as CategoryType;
            if(categoryData.sub_categories.length===0){
                await queryClient.prefetchInfiniteQuery({
                    queryKey: getProductsQueryOptions.getProductsInfiniteQueryKey(category_id, sub_category_id, ''),
                    queryFn: () => getProductsQueryOptions.getProductsQueryFn({pageParam: 1, category_id, sub_category_id, custom_filter:''}),
                    initialPageParam: getProductsQueryOptions.getProductsQueryInitialPageParam,
                })
            }
        }
    }else{
        await queryClient.prefetchInfiniteQuery({
            queryKey: getProductsQueryOptions.getProductsInfiniteQueryKey(category_id, sub_category_id, ''),
            queryFn: () => getProductsQueryOptions.getProductsQueryFn({pageParam: 1, category_id, sub_category_id, custom_filter:''}),
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
                        <div className=" w-full lg:w-1/5 shrink-0 lg:sticky lg:top-8">
                            <CategoryContainer />
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