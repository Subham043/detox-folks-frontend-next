import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/app/components/ui/dialog"
import { FaSearch } from "react-icons/fa"
import SearchCard from "./SearchCard"
import { useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import debounce from 'lodash.debounce'
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReactTyped } from "react-typed";
import { getGlobalSearchQueryOptions } from "@/app/utils/data-query/getGlobalSearchQuery"

const TypedString = ["Containers", "Silver Pouch", "Parcel Sheet", "Bag", "Tissue", "Meal Tray", "Paper Cup", "Tape", "Cutlery", "Gloves", "Mask"];

export default function SearchDialog(){
    const [search, setSearch] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data
    } = useInfiniteQuery({
        queryKey: getGlobalSearchQueryOptions.getGlobalSearchQueryKey(search),
        queryFn: (param) => getGlobalSearchQueryOptions.getGlobalSearchQueryFn({pageParam: param.pageParam, search}),
        initialPageParam: getGlobalSearchQueryOptions.getGlobalSearchQueryInitialPageParam,
        enabled: isOpen && search.length>0,
        getNextPageParam: (lastPage, allPages) => getGlobalSearchQueryOptions.getGlobalSearchQueryNextPageParam(lastPage, allPages),
        select: (data) => getGlobalSearchQueryOptions.getGlobalSearchQuerySelect(data),
    })

    const searchHandler = debounce(async (e: string) => {
        setSearch(e);
    }, 500);

    return <Dialog onOpenChange={(open)=>setIsOpen(open)}>
        <DialogTrigger asChild>
            <button className=" flex justify-between items-center flex-1 px-3 py-3 rounded-lg border-black border-solid border bg-gray-100">
                <p className=" text-gray-600 text-sm">Search <ReactTyped strings={TypedString} typeSpeed={60} backSpeed={70} loop /></p>
                <FaSearch />
            </button>
        </DialogTrigger>
        <DialogContent className="p-0">
            <div className=" w-full">
                <div className=" flex justify-between items-center w-full px-3 rounded-t-lg border-black border-solid border-b-2 bg-gray-100">
                    <FaSearch />
                    <input type="text" onChange={(event) => searchHandler(event.target.value)} className=" text-gray-600 text-sm flex-1 px-4 py-4 bg-gray-100 focus-within:outline-none focus:outline-none focus-visible:outline-none" placeholder="Search anything ..."/>
                </div>
                <div id="searchCardBodyDiv" className="px-3 py-3 bg-gray-100 w-full max-h-96 overflow-hidden overflow-y-auto">
                    <InfiniteScroll
                        dataLength={data ? data.pages.length : 0}
                        next={fetchNextPage}
                        hasMore={hasNextPage ? hasNextPage: false}
                        loader={(isFetchingNextPage) && <div className="text-center py-1">Loading...</div>}
                        refreshFunction={fetchNextPage}
                        scrollableTarget="searchCardBodyDiv"
                    >
                        {
                            (data ? data.pages : []).map((item, i) => <SearchCard {...item} key={i} />)
                        }
                    </InfiniteScroll>
                    {(data ? data.pages : []).length===0 && <p className="w-full text-center">Type to search <ReactTyped strings={TypedString} typeSpeed={60} backSpeed={70} loop /></p>}
                </div>
            </div>
        </DialogContent>
    </Dialog>
}