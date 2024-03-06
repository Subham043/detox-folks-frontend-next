"use client";
import { getBlogsQueryOptions } from "@/app/_libs/utils/query/getBlogsQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import PopularBlogCard from "./PopularBlogCard";

export default function PopularBlogs() {
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

    return <div className=" w-full border rounded-sm overflow-hidden border-neutral-700">
        <div className="py-2 bg-neutral-700 w-full text-center">
            <h4 className=" text-xl font-semibold text-white">Popular Blogs</h4>
        </div>
        <div id="popularBlogCardBodyDiv" className="bg-white w-full max-h-[35rem] overflow-hidden overflow-y-auto">
            <InfiniteScroll
                dataLength={data ? data.pages.length : 0}
                next={fetchNextPage}
                hasMore={hasNextPage ? hasNextPage: false}
                loader={(isFetchingNextPage) && <div className="text-center py-1">Loading...</div>}
                refreshFunction={fetchNextPage}
                className="w-full max-w-full"
                scrollableTarget="popularBlogCardBodyDiv"
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