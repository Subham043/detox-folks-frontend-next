"use client";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQueryOptions } from "../_libs/utils/query/getCategoriesQuery";
import CategoryCard from "../category/_components/CategoryCard";
import Link from "next/link";
import { page } from "../_libs/utils/routes/pages";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Categories() {
    const {
        data
    } = useQuery({
        queryKey: getCategoriesQueryOptions.getCategoriesQueryKey,
        queryFn: () => getCategoriesQueryOptions.getCategoriesQueryFn({pageParam: 1}),
    })

    return <div className="w-full pt-10 pb-8">
        <div className="container mx-auto">
            <div className="w-full max-w-full flex flex-wrap justify-between items-start gap-3 mb-5">
                <h3 className="w-auto text-lg md:text-2xl font-semibold">
                    What are you looking for?
                </h3>
                <Link href={`${page.category}`} className="w-auto text-xs md:text-sm bg-black text-white text-center px-2 py-2 md:px-3 md:py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><span>Show More</span> <FaArrowRightLong className="text-xs md:text-base" /></Link>
            </div>
            <div className="w-full flex flex-wrap justify-start items-start gap-y-5">
                {
                    (data ? data.data : []).map((item, i) => <div className=" w-1/2 md:w-1/3 lg:w-1/5 px-2 sm:px-0" key={i}>
                        <CategoryCard name={item.name} image={item.image} slug={item.slug} id={item.id} />
                    </div>)
                }
            </div>
        </div>
    </div>
}