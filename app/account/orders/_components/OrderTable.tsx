"use client";
import { getOrdersQueryOptions } from "@/app/_libs/utils/query/getOrdersQuery"
import { useInfiniteQuery } from "@tanstack/react-query"
import OrderTableCard from "./OrderTableCard";
import InfiniteScroll from "react-infinite-scroller";

export default function OrderTable() {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        isRefetching,
        data
    } = useInfiniteQuery({
        queryKey: getOrdersQueryOptions.getOrdersInfiniteQueryKey,
        queryFn: (param) => getOrdersQueryOptions.getOrdersQueryFn({pageParam: param.pageParam}),
        initialPageParam: getOrdersQueryOptions.getOrdersQueryInitialPageParam,
        getNextPageParam: (lastPage, allPages) => getOrdersQueryOptions.getOrdersQueryNextPageParam(lastPage, allPages),
        select: (data) => getOrdersQueryOptions.getOrdersQuerySelect(data),
    })

    const loadMore = () => !isFetchingNextPage && fetchNextPage({
        cancelRefetch: true
    })

    return <>
        <div className="w-full py-10">
            <div className="container mx-auto">
                <InfiniteScroll
                    pageStart={1}
                    initialLoad={true}
                    loadMore={loadMore}
                    hasMore={hasNextPage}
                    loader={(isFetching || isFetchingNextPage) ? <div className="loader">Loading ...</div> : undefined}
                >
                    <div className="flex flex-col overflow-x-auto">
                        <div className="sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border text-left text-sm font-light">
                                        <thead className="border bg-[#8c6d52] font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                            <tr>
                                                <th scope="col" className="border-r px-6 py-4">Order ID</th>
                                                <th scope="col" className="border-r px-6 py-4 text-center hidden lg:table-cell">Products</th>
                                                <th scope="col" className="border-r px-6 py-4 text-center">Amount</th>
                                                <th scope="col" className="border-r px-6 py-4 text-center">Delivery Slot</th>
                                                <th scope="col" className="border-r px-6 py-4 text-center">Order Status</th>
                                                <th scope="col" className="border-r px-6 py-4 text-center hidden lg:table-cell">Payment Mode</th>
                                                <th scope="col" className="border-r px-6 py-4 text-center hidden lg:table-cell">Payment Status</th>
                                                <th scope="col" className="border-r px-6 py-4 text-center">Placed On</th>
                                                <th scope="col" className="border-r px-6 py-4 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ((data ? data.pages : []).length>0 ? (data ? data.pages : []).map((item,i) => <OrderTableCard {...item} key={i} />) :
                                                <tr className=" border-b dark:border-neutral-500">
                                                    <td className="whitespace-nowrap border-r px-6 py-4 text-center" colSpan={8}>
                                                        <p>No orders are there!</p>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    </>
}