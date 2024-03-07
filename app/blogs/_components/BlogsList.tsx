"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import { getBlogsQueryOptions } from "@/app/_libs/utils/query/getBlogsQuery";
import InfiniteScroll from "react-infinite-scroller";

export default function BlogsList() {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        data
    } = useInfiniteQuery({
        queryKey: getBlogsQueryOptions.getBlogsInfiniteQueryKey,
        queryFn: (param) => getBlogsQueryOptions.getBlogsQueryFn({pageParam: param.pageParam}),
        initialPageParam: getBlogsQueryOptions.getBlogsQueryInitialPageParam,
        getNextPageParam: (lastPage, allPages) => getBlogsQueryOptions.getBlogsQueryNextPageParam(lastPage, allPages),
        select: (data) => getBlogsQueryOptions.getBlogsQuerySelect(data),
    })

    const loadMore = () => !isFetchingNextPage && fetchNextPage({
        cancelRefetch: true
    })

    return <div className="w-full py-10">
        <div className="container mx-auto">
            <InfiniteScroll
                pageStart={1}
                initialLoad={false}
                loadMore={loadMore}
                hasMore={hasNextPage}
                loader={(isFetching || isFetchingNextPage) ? <div className="loader" key={0}>Loading ...</div> : undefined}
            >
                <div className="w-full flex flex-wrap justify-center items-start">
                    
                    {
                        (data ? data.pages : []).map((item, i) => <div className="w-1/2 lg:w-1/4" key={i}>
                            <BlogCard {...item} />
                        </div>)
                    }
                </div>
            </InfiniteScroll>
        </div>
    </div>

}