"use client";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQueryOptions } from "../utils/data-query/getCategoriesQuery";
import CategoryCard from "../category/CategoryCard";

export default function Categories() {
    const {
        data
    } = useQuery({
        queryKey: getCategoriesQueryOptions.getCategoriesQueryKey,
        queryFn: () => getCategoriesQueryOptions.getCategoriesQueryFn({pageParam: 1}),
    })

    return <div className="w-full py-10">
        <div className="container mx-auto">
            <div className="w-full flex flex-wrap justify-start items-start">
                {
                    (data ? data.data : []).map((item, i) => <div className=" w-1/5" key={i}>
                        <CategoryCard name={item.name} image={item.image} slug={item.slug} />
                    </div>)
                }
            </div>
        </div>
    </div>
}