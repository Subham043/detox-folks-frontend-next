"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import CategoryCard from "./CategoryCard";
import { getCategoriesQueryOptions } from "../../_libs/utils/query/getCategoriesQuery";
import InfiniteScroll from "react-infinite-scroller";

export default function Categories() {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        data
    } = useInfiniteQuery({
        queryKey: getCategoriesQueryOptions.getCategoriesInfiniteQueryKey,
        queryFn: (param) => getCategoriesQueryOptions.getCategoriesQueryFn({pageParam: param.pageParam}),
        initialPageParam: getCategoriesQueryOptions.getCategoriesQueryInitialPageParam,
        getNextPageParam: (lastPage, allPages) => getCategoriesQueryOptions.getCategoriesQueryNextPageParam(lastPage, allPages),
        select: (data) => getCategoriesQueryOptions.getCategoriesQuerySelect(data),
    })

    const loadMore = () => !isFetchingNextPage && fetchNextPage({
        cancelRefetch: true
    })

    return <div className="w-full">
        <InfiniteScroll
            pageStart={1}
            initialLoad={false}
            loadMore={loadMore}
            hasMore={hasNextPage}
            loader={(isFetching || isFetchingNextPage) ? <div className="loader" key={0}>Loading ...</div> : undefined}
        >
            <div className="w-full flex flex-wrap justify-start items-start">
                
                {
                    (data ? data.pages : []).map((item, i) => <div className=" w-1/2 md:w-1/3 lg:w-1/5" key={i}>
                        <CategoryCard name={item.name} image={item.image} slug={item.slug} id={item.id} />
                    </div>)
                }
            </div>
        </InfiniteScroll>
    </div>
}