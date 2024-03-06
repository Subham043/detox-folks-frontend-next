"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBlogsQueryOptions } from "@/app/_libs/utils/query/getBlogsQuery";

export default function BlogsList() {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data
    } = useInfiniteQuery({
        queryKey: getBlogsQueryOptions.getBlogsInfiniteQueryKey,
        queryFn: (param) => getBlogsQueryOptions.getBlogsQueryFn({pageParam: param.pageParam}),
        initialPageParam: getBlogsQueryOptions.getBlogsQueryInitialPageParam,
        getNextPageParam: (lastPage, allPages) => getBlogsQueryOptions.getBlogsQueryNextPageParam(lastPage, allPages),
        select: (data) => getBlogsQueryOptions.getBlogsQuerySelect(data),
    })

    return <div className="w-full py-10">
        <div className="container mx-auto">
            <InfiniteScroll
                dataLength={data ? data.pages.length : 0}
                next={fetchNextPage}
                hasMore={hasNextPage ? hasNextPage: false}
                loader={(isFetchingNextPage) && <div className="text-center py-1">Loading...</div>}
                refreshFunction={fetchNextPage}
                className="w-full"
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