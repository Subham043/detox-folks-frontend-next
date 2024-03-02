"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import CategoryCard from "./CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCategoriesQueryOptions } from "../../../_libs/utils/query/getCategoriesQuery";
import { useSearchParams } from 'next/navigation'

export default function Categories() {
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get('category')
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

    return <div className=" w-full border rounded-sm overflow-hidden border-neutral-700">
        <div className="py-2 bg-neutral-700 w-full text-center">
            <h4 className=" text-xl font-semibold text-white">Categories</h4>
        </div>
        <div id="categoryCardBodyDiv" className="bg-white w-full max-h-[35rem] overflow-hidden overflow-y-auto">
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
                    <div className={` w-full shrink-0 ${(categoryParam===null || (categoryParam && categoryParam.length===0)) ? 'bg-neutral-300' : 'bg-neutral-100'} border-b border-gray-300`}>
                        <CategoryCard name='All' image='/disposables.webp' id='' slug="" />
                    </div>
                    {
                        (data ? data.pages : []).map((item, i) => <div className={` ${categoryParam && categoryParam===item.slug ? 'bg-neutral-300' : 'bg-neutral-100'} w-full shrink-0 border-b border-gray-300`} key={i}>
                            <CategoryCard name={item.name} image={item.image} id={item.id} slug={item.slug} />
                        </div>)
                    }
                </div>
            </InfiniteScroll>
        </div>
    </div>
}