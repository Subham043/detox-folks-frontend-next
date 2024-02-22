"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProducts } from "../utils/data-query/getProducts";
import ProductCard from "./ProductCard";

export default function ProductSection() {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data
    } = useInfiniteQuery({
        queryKey: ["products"],
        queryFn: (param) => getProducts({pageParam: param.pageParam}),
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) => {
            const morePagesExist =
              allPages.flatMap((page) => page.data).length !==
              lastPage.meta.total;
            if (morePagesExist) {
              return allPages.length + 1;
            }
            return undefined;
        },
        select: (data) => ({
            ...data,
            pages: data.pages.flatMap((page) => page.data),
        }),
    })

    return <InfiniteScroll
        dataLength={data ? data.pages.length : 0}
        next={fetchNextPage}
        hasMore={hasNextPage ? hasNextPage: false}
        loader={(isFetchingNextPage) && <div className="text-center py-1">Loading...</div>}
        refreshFunction={fetchNextPage}
        className="w-full max-w-full"
        
    >
        <div className="w-full max-w-full flex flex-wrap justify-start items-start">
            {
                (data ? data.pages : []).map((item, i) => <div className=" w-1/4 shrink-0" key={i}>
                    <ProductCard name={item.name} image={item.image} slug={item.slug} />
                </div>)
            }
        </div>
    </InfiniteScroll>
}