"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import CategoryCard from "./CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCategoriesQueryOptions } from "../../_libs/utils/query/getCategoriesQuery";

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

    return <InfiniteScroll
                dataLength={data ? data.pages.length : 0}
                next={fetchNextPage}
                hasMore={hasNextPage ? hasNextPage: false}
                loader={(isFetchingNextPage) && <div className="text-center py-1">Loading...</div>}
                refreshFunction={fetchNextPage}
                className="w-full"
            >
                <div className="w-full flex flex-wrap justify-start items-start">
                    
                    {
                        (data ? data.pages : []).map((item, i) => <div className=" w-1/2 md:w-1/3 lg:w-1/5" key={i}>
                            <CategoryCard name={item.name} image={item.image} slug={item.slug} id={item.id} />
                        </div>)
                    }
                </div>
            </InfiniteScroll>
}