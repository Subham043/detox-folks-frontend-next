"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProductsQueryOptions } from "../../../_libs/utils/query/getProductsQuery";
import ProductCard from "./ProductCard";

export default function ProductSection({
    searchParams
  }: {
    searchParams?: { 
        category: string | undefined,
        category_id: string | undefined,
        sub_category: string | undefined,
        sub_category_id: string | undefined,
    };
  }) {

    const category_id = searchParams && searchParams.category_id && searchParams.category_id.length!==0 ? searchParams.category_id : ''; 
    const sub_category_id = searchParams && searchParams.sub_category_id && searchParams.sub_category_id.length!==0 ? searchParams.sub_category_id : '';

    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data
    } = useInfiniteQuery({
        queryKey: getProductsQueryOptions.getProductsInfiniteQueryKey(category_id, sub_category_id, ''),
        queryFn: (param) => getProductsQueryOptions.getProductsQueryFn({pageParam: param.pageParam, category_id, sub_category_id, custom_filter:''}),
        initialPageParam: getProductsQueryOptions.getProductsQueryInitialPageParam,
        getNextPageParam: (lastPage, allPages) => getProductsQueryOptions.getProductsQueryNextPageParam(lastPage, allPages),
        select: (data) => getProductsQueryOptions.getProductsQuerySelect(data),
    })

    return <div className="w-full" id="productsPageBodyDiv">
        <InfiniteScroll
            dataLength={data ? data.pages.length : 0}
            next={fetchNextPage}
            hasMore={hasNextPage ? hasNextPage: false}
            loader={(isFetchingNextPage) && <div className="text-center py-1">Loading...</div>}
            refreshFunction={fetchNextPage}
            className="w-full max-w-full"
            scrollableTarget="productsPageBodyDiv"
        >
            <div className="w-full max-w-full flex flex-wrap justify-start items-start">
                {
                    (data ? data.pages : []).map((item, i) => <div className=" w-1/2 lg:w-1/4 shrink-0" key={i}>
                        <ProductCard {...item} />
                    </div>)
                }
            </div>
        </InfiniteScroll>
    </div>
}