import { InfiniteData } from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import { ProductResponseType } from "../types";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "../contants/queryOptions";
import { api } from "../routes/api";

const getProductsQueryKey = ["products"];
const getProductsInfiniteQueryKey = ["products_infinite"];
const getProductsQueryInitialPageParam = getQueryInitialPageParam;

const getProductsQueryFn: (params: {
    pageParam?: any
})=>Promise<ProductResponseType> = async ({
    pageParam = 1
}: {
    pageParam?: any
}) => {
    const response = await axiosPublic.get(
        api.products +
        `?page=${pageParam}&total=${getQueryTotalCount}&sort=name`
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