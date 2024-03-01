"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryQueryOptions } from "../../_libs/utils/query/getCategoryQuery";
import ProductSection from "./ProductSection";
import SubCategories from "./SubCategories";

export default function DisplaySection({
    searchParams
  }: {
    searchParams?: { 
        category: string | undefined 
    };
  }) {

    const category = searchParams && searchParams.category && searchParams.category.length!==0 ? searchParams.category : '' 
    const {data:categoryData} = useQuery({
        queryKey: getCategoryQueryOptions.getCategoryQueryKey(category),
        queryFn: () => getCategoryQueryOptions.getCategoryQueryFn(category),
        enabled: category.length>0
    })

    if(category.length>0 && categoryData && categoryData.sub_categories.length>0){
        return <SubCategories name={categoryData.name} slug={categoryData.slug} sub_categories={categoryData.sub_categories} />
    }

    return <ProductSection searchParams={searchParams} />
}