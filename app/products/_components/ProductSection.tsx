"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProductsQueryOptions } from "../../_libs/utils/query/getProductsQuery";
import ProductCard from "./ProductCard";
import { SearchParamsType } from "../../_libs/utils/types";

export default function ProductSection({
    searchParams
  }: {
    searchParams?: SearchParamsType;
  }) {

    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data
    } = useInfiniteQuery({
        queryKey: getProductsQueryOptions.getProductsInfiniteQueryKey,
        queryFn: (param) => getProductsQueryOptions.getProductsQueryFn({pageParam: param.pageParam}),
        initialPageParam: getProductsQueryOptions.getProductsQueryInitialPageParam,
        getNextPageParam: (lastPage, allPages) => getProductsQueryOptions.getProductsQueryNextPageParam(lastPage, allPages),
        select: (data) => getProductsQueryOptions.getProductsQuerySelect(data),
    })

    return <InfiniteScroll
        dataLength={data ? data.pages.length : 0}
        next={fetchNextPage}
        hasMore={hasNextPage ? hasNextPage: false}
        loader={(isFetchingNextPage) && <div className="text-center py-1">Loading...</div>}
        refreshFunction={fetchNextPage}
        className="w-full max-w-full"
        
    >
        <div className="w-full max-w-full flex flex-wrap justify-start items-start">
            {
                (data ? data.pages : []).map((item, i) => <div className=" w-1/4 shrink-0" key={i}>
                    <ProductCard {...item} />
                </div>)
            }
        </div>
    </InfiniteScroll>
}