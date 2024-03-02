import { InfiniteData } from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import { ProductResponseType } from "../types";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "../contants/queryOptions";
import { api } from "../routes/api";

const getProductsQueryKey = ["products"];
const getProductsInfiniteQueryKey = (category_id:string, sub_category_id:string) => ["products_infinite", category_id, sub_category_id];
const getProductsQueryInitialPageParam = getQueryInitialPageParam;

const getProductsQueryFn: (params: {
    pageParam?: any, category_id: string, sub_category_id:string
})=>Promise<ProductResponseType> = async ({
    pageParam = 1, category_id, sub_category_id
}: {
    pageParam?: any, category_id: string, sub_category_id:string
}) => {
    const category_filter = category_id.length>0 ? `&filter[has_categories]=${category_id}` : '';
    const sub_category_filter = sub_category_id.length>0 ? `&filter[has_sub_categories]=${sub_category_id}` : '';
    const response = await axiosPublic.get(
        api.products +
        `?page=${pageParam}&total=${getQueryTotalCount}&sort=name${category_filter}${sub_category_filter}`
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