"use client";
import { getBlogsQueryOptions } from "@/app/_libs/utils/query/getBlogsQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import PopularBlogCard from "./PopularBlogCard";
import InfiniteScroll from "react-infinite-scroller";
import { useRef } from "react";

export default function PopularBlogs() {
    const scrollRef = useRef(null)

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

    return <div className=" w-full border rounded-sm overflow-hidden border-neutral-700">
        <div className="py-2 bg-neutral-700 w-full text-center">
            <h4 className=" text-xl font-semibold text-white">Popular Blogs</h4>
        </div>
        <div className="bg-white w-full max-h-[35rem] overflow-hidden overflow-y-auto" ref={scrollRef}>
            <InfiniteScroll
                pageStart={1}
                initialLoad={false}
                loadMore={loadMore}
                hasMore={hasNextPage}
                loader={(isFetching || isFetchingNextPage) ? <div className="loader" key={0}>Loading ...</div> : undefined}
                useWindow={false}
                getScrollParent={() => scrollRef.current}
            >
                <div className="w-full max-w-full flex flex-wrap justify-start items-start">
                    {
                        (data ? data.pages : []).map((item, i) => <div className={` bg-neutral-100 w-full shrink-0 border-b border-gray-300`} key={i}>
                            <PopularBlogCard name={item.name} image={item.image} slug={item.slug} description_unfiltered={item.description_unfiltered} />
                        </div>)
                    }
                </div>
            </InfiniteScroll>
        </div>
    </div>
}