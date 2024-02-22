"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import CategoryCard from "./CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCategories } from "../utils/data-query/getCategories";

export default function Categories() {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data
    } = useInfiniteQuery({
        queryKey: ["categories"],
        queryFn: (param) => getCategories({pageParam: param.pageParam}),
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
                <div className="w-full flex flex-wrap justify-start items-start">
                    
                    {
                        (data ? data.pages : []).map((item, i) => <div className=" w-1/5" key={i}>
                            <CategoryCard name={item.name} image={item.image} slug={item.slug} />
                        </div>)
                    }
                </div>
            </InfiniteScroll>
        </div>
    </div>
}