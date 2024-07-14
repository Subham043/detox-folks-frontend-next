"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/app/_libs/components/ui/dialog"
import { FaSearch } from "react-icons/fa"
import SearchCard from "./SearchCard"
import { useEffect, useRef, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import debounce from 'lodash.debounce'
import { ReactTyped } from "react-typed";
import { getGlobalSearchQueryOptions } from "@/app/_libs/utils/query/getGlobalSearchQuery"
import InfiniteScroll from "react-infinite-scroller";
import { usePathname } from "next/navigation";

const TypedString = ["Containers", "Silver Pouch", "Parcel Sheet", "Bag", "Tissue", "Meal Tray", "Paper Cup", "Tape", "Cutlery", "Gloves", "Mask"];

export default function SearchDialog(){
    const pathname = usePathname();
    const [search, setSearch] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const scrollRef = useRef(null)
    const closeSidebar = () => setIsOpen(false)
    useEffect(() => closeSidebar(), [pathname]);

    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        data
    } = useInfiniteQuery({
        queryKey: getGlobalSearchQueryOptions.getGlobalSearchQueryKey(search),
        queryFn: (param) => getGlobalSearchQueryOptions.getGlobalSearchQueryFn({pageParam: param.pageParam, search}),
        initialPageParam: getGlobalSearchQueryOptions.getGlobalSearchQueryInitialPageParam,
        enabled: isOpen && search.length>0,
        getNextPageParam: (lastPage, allPages) => getGlobalSearchQueryOptions.getGlobalSearchQueryNextPageParam(lastPage, allPages),
        select: (data) => getGlobalSearchQueryOptions.getGlobalSearchQuerySelect(data),
    })

    const loadMore = () => !isFetchingNextPage && fetchNextPage({
        cancelRefetch: true
    })

    const searchHandler = debounce(async (e: string) => {
        setSearch(e);
    }, 500);

    return <Dialog open={isOpen} onOpenChange={(open)=>{setIsOpen(open); setSearch('')}}>
        <DialogTrigger asChild>
            <button className=" flex justify-between items-center flex-1 px-3 py-3 rounded-lg border-[#8c6d52] border-solid border bg-[#ede1d736]">
                <p className=" text-gray-600 text-sm">Search <ReactTyped strings={TypedString} typeSpeed={60} backSpeed={70} loop /></p>
                <FaSearch className="text-[#8c6d52]" />
            </button>
        </DialogTrigger>
        <DialogContent className="p-0">
            <div className=" w-full">
                <div className=" flex justify-between items-center w-full px-3 rounded-t-lg border-[#8c6d52] border-solid border-b-2 bg-[#ede1d736]">
                    <FaSearch />
                    <input type="text" onChange={(event) => searchHandler(event.target.value)} className={` text-gray-600 text-sm flex-1 px-4 py-4 ${isOpen ? 'bg-white' : 'bg-[#ede1d736]'} focus-within:outline-none focus:outline-none focus-visible:outline-none`} placeholder="Search anything ..."/>
                </div>
                <div className="px-3 py-3 bg-[#ede1d736] w-full max-h-96 overflow-hidden overflow-y-auto" ref={scrollRef}>
                    <InfiniteScroll
                        pageStart={1}
                        initialLoad={true}
                        loadMore={loadMore}
                        hasMore={hasNextPage}
                        loader={(isFetching || isFetchingNextPage) ? <div className="loader">Loading ...</div> : undefined}
                        useWindow={false}
                        getScrollParent={() => scrollRef.current}
                    >
                        {
                            (data ? data.pages : []).map((item, i) => <SearchCard {...item} key={i} />)
                        }
                    </InfiniteScroll>
                    {
                        isFetching ? <p className="w-full text-center">Loading...</p> : 
                        ((data ? data.pages : []).length===0 && <p className="w-full text-center">Type to search <ReactTyped strings={TypedString} typeSpeed={60} backSpeed={70} loop /></p>)
                    }
                </div>
            </div>
        </DialogContent>
    </Dialog>
}