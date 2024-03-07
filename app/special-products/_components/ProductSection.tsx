import { getProductsQueryOptions } from "@/app/_libs/utils/query/getProductsQuery";
import getQueryClient from "@/app/_libs/utils/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Products from "./Products";

export default async function ProductSection({
    slug
  }: {
    slug: string;
  }) {
    const queryClient = getQueryClient()
    await queryClient.prefetchInfiniteQuery({
        queryKey: getProductsQueryOptions.getProductsInfiniteQueryKey('', '', slug),
        queryFn: () => getProductsQueryOptions.getProductsQueryFn({pageParam: 1, category_id: '', sub_category_id:'', custom_filter:slug}),
        initialPageParam: getProductsQueryOptions.getProductsQueryInitialPageParam,
    })

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="w-full py-10">
                <div className="container mx-auto">
                    <div className="w-full max-w-full flex flex-wrap justify-between items-start">
                        <div className=" w-full">
                            <Products slug={slug} />
                        </div>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    </>
}