import { getProductReviewQueryOptions } from "@/app/_libs/utils/query/getProductReviewsQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroller";

export default function ReviewSection({ slug }: { slug: string }) {
 const scrollRef = useRef(null)

 const {
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  data
 } = useInfiniteQuery({
  queryKey: getProductReviewQueryOptions.getProductReviewQueryKey(slug),
  queryFn: (param) => getProductReviewQueryOptions.getProductReviewQueryFn({ pageParam: param.pageParam, slug }),
  initialPageParam: getProductReviewQueryOptions.getProductReviewQueryInitialPageParam,
  getNextPageParam: (lastPage, allPages) => getProductReviewQueryOptions.getProductReviewQueryNextPageParam(lastPage, allPages),
  select: (data) => getProductReviewQueryOptions.getProductReviewQuerySelect(data),
 })

 const loadMore = () => !isFetchingNextPage && fetchNextPage({
  cancelRefetch: true
 })

 return <div className="border border-[#8c6d52] rounded-b-sm w-full max-h-[15rem] overflow-hidden overflow-y-auto" ref={scrollRef}>
  <InfiniteScroll
   pageStart={1}
   initialLoad={false}
   loadMore={loadMore}
   hasMore={hasNextPage}
   loader={(isFetching || isFetchingNextPage) ? <div className="loader">Loading ...</div> : undefined}
   useWindow={false}
   getScrollParent={() => scrollRef.current}
  >
   {
    (data ? data.pages : []).map((item, i) => <div className="px-2 py-2 w-full flex flex-wrap gap-3 justify-start items-start border-b border-[#8c6d52] border-dotted" key={i}>
     <div className="w-8 h-8 bg-[#bbbbbb] text-white rounded-full flex justify-center items-center">
      {item.user_name.charAt(0).toUpperCase()}
     </div>
     <div className=" flex-1">
      <div className=" flex flex-wrap justify-between items-center gap-1">
       <h5 className=" text-[#8c6d52] font-semibold">{item.user_name}</h5>
       <p className=" text-xs text-gray-400 inline-flex gap-1 items-center"><CiClock2 /> {item.created_at}</p>
      </div>
      <div className=" flex flex-wrap gap-1 text-[#f1d210]">
       {[...Array(item.rating)].map((_, i) => <FaStar key={i} />)}
      </div>
      {item.comment && <p className=" text-sm"><i>{item.comment}</i></p>}
     </div>
    </div>)
   }
  </InfiniteScroll>
 </div>
}