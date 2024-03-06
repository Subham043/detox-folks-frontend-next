"use client";
import { getProductsQueryOptions } from "@/app/_libs/utils/query/getProductsQuery";
import ProductCard from "@/app/products/_components/Products/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Products({
    slug
  }: {
    slug: string;
  }) {


    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data
    } = useInfiniteQuery({
        queryKey: getProductsQueryOptions.getProductsInfiniteQueryKey('', '', slug),
        queryFn: (param) => getProductsQueryOptions.getProductsQueryFn({pageParam: param.pageParam, category_id:'', sub_category_id:'', custom_filter:slug}),
        initialPageParam: getProductsQueryOptions.getProductsQueryInitialPageParam,
        getNextPageParam: (lastPage, allPages) => getProductsQueryOptions.getProductsQueryNextPageParam(lastPage, allPages),
        select: (data) => getProductsQueryOptions.getProductsQuerySelect(data),
    })

    return <div className="w-full" id="specialProductPageBodyDiv">
        <InfiniteScroll
            dataLength={data ? data.pages.length : 0}
            next={fetchNextPage}
            hasMore={hasNextPage ? hasNextPage: false}
            loader={(isFetchingNextPage) && <div className="text-center py-1">Loading...</div>}
            refreshFunction={fetchNextPage}
            className="w-full max-w-full"
            scrollableTarget="specialProductPageBodyDiv"
        >
            <div className="w-full max-w-full flex flex-wrap justify-start items-start">
                {
                    (data ? data.pages : []).map((item, i) => <div className=" w-1/2 md:w-1/3 lg:w-1/5 shrink-0" key={i}>
                        <ProductCard {...item} />
                    </div>)
                }
            </div>
        </InfiniteScroll>
    </div>
}