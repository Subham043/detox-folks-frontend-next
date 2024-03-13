"use client";

import ProductCard from "../products/_components/Products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProductsQueryOptions } from "../_libs/utils/query/getProductsQuery";
import ProductsLoading from "./ProductsLoading";

export default function Products({slug}:{slug:string}){
    const {
        data,
        isFetching,
        isRefetching
    } = useQuery({
        queryKey: getProductsQueryOptions.getProductsQueryKey(slug),
        queryFn: () => getProductsQueryOptions.getProductsQueryFn({pageParam: 1, category_id:'', sub_category_id:'', custom_filter:slug}),
    })

    return <div className="w-full max-w-full">
                {(isFetching || isRefetching) ? <ProductsLoading /> :
                <div className="w-full max-w-full flex flex-wrap justify-start items-start">
                    {
                        (data ? data.data : []).map((item, i) => <div className=" w-full md:w-1/3 lg:w-1/5 shrink-0" key={i}>
                            <ProductCard {...item} />
                        </div>)
                    }
                </div>}
            </div>
}