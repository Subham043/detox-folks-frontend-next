"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import CategoryCard from "./CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCategoriesQueryOptions } from "../utils/data-query/getCategoriesQuery";

export default function Categories() {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data
    } = useInfiniteQuery({
        queryKey: getCategoriesQueryOptions.getCategoriesInfiniteQueryKey,
        queryFn: (param) => getCategoriesQueryOptions.getCategoriesQueryFn({pageParam: param.pageParam}),
        initialPageParam: getCategoriesQueryOptions.getCategoriesQueryInitialPageParam,
        getNextPageParam: (lastPage, allPages) => getCategoriesQueryOptions.getCategoriesQueryNextPageParam(lastPage, allPages),
        select: (data) => getCategoriesQueryOptions.getCategoriesQuerySelect(data),
    })

    return <div className=" w-full border rounded-md overflow-hidden border-black">
        <div className="py-3 bg-black w-full text-center">
            <h4 className=" text-xl font-semibold text-white">Categories</h4>
        </div>
        <div id="categoryCardBodyDiv" className="bg-white w-full max-h-96 overflow-hidden overflow-y-auto">
            <InfiniteScroll
                dataLength={data ? data.pages.length : 0}
                next={fetchNextPage}
                hasMore={hasNextPage ? hasNextPage: false}
                loader={(isFetchingNextPage) && <div className="text-center py-1">Loading...</div>}
                refreshFunction={fetchNextPage}
                className="w-full max-w-full"
                scrollableTarget="categoryCardBodyDiv"
                
            >
                <div className="w-full max-w-full flex flex-wrap justify-start items-start">
                    <div className=" w-full shrink-0 bg-gray-200 border-b border-gray-300">
                        <CategoryCard name='All' image='/disposables.webp' slug='' />
                    </div>
                    {
                        (data ? data.pages : []).map((item, i) => <div className=" w-full shrink-0 border-b border-gray-300" key={i}>
                            <CategoryCard name={item.name} image={item.image} slug={item.slug} />
                        </div>)
                    }
                </div>
            </InfiniteScroll>
        </div>
    </div>
}