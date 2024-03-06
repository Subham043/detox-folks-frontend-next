import { InfiniteData } from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import { ProductResponseType } from "../types";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "../contants/queryOptions";
import { api } from "../routes/api";

const getProductsQueryKey = (filter:string) => ["products", filter];
const getProductsInfiniteQueryKey = (category_id:string, sub_category_id:string, custom_filter:string) => ["products_infinite", category_id, sub_category_id, custom_filter];
const getProductsQueryInitialPageParam = getQueryInitialPageParam;

const getProductsQueryFn: (params: {
    pageParam?: any, category_id: string, sub_category_id:string, custom_filter:string
})=>Promise<ProductResponseType> = async ({
    pageParam = 1, category_id, sub_category_id, custom_filter
}: {
    pageParam?: any, category_id: string, sub_category_id:string, custom_filter:string
}) => {
    const filter = custom_filter.length>0 ? `&filter[${custom_filter}]=true` : '';
    const category_filter = category_id.length>0 ? `&filter[has_categories]=${category_id}` : '';
    const sub_category_filter = sub_category_id.length>0 ? `&filter[has_sub_categories]=${sub_category_id}` : '';
    const response = await axiosPublic.get(
        api.products +
        `?page=${pageParam}&total=${getQueryTotalCount}&sort=id${category_filter}${sub_category_filter}${filter}`
    );
    return response.data as ProductResponseType;
}

const getProductsQueryNextPageParam = (lastPage:ProductResponseType, allPages:ProductResponseType[]) => getQueryNextPageParam<ProductResponseType>(lastPage, allPages)

const getProductsQuerySelect = (data:InfiniteData<ProductResponseType, number>) => getQuerySelect<InfiniteData<ProductResponseType, number>>(data)

export const getProductsQueryOptions = {
    getProductsQueryKey,
    getProductsInfiniteQueryKey,
    getProductsQueryInitialPageParam,
    getProductsQueryFn,
    getProductsQueryNextPageParam,
    getProductsQuerySelect
}