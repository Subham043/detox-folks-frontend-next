import { InfiniteData } from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import { OrderResponseType } from "../types";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "../contants/queryOptions";
import { api } from "../routes/api";

const getOrdersQueryKey = ["orders"];
const getOrdersInfiniteQueryKey = ["orders_infinite"];
const getOrdersQueryInitialPageParam = getQueryInitialPageParam;

const getOrdersQueryFn: (params: {
    pageParam?: any
})=>Promise<OrderResponseType> = async ({
    pageParam = 1
}: {
    pageParam?: any
}) => {
    const response = await axiosPublic.get(
        api.place_order_paginate +
        `?page=${pageParam}&total=${getQueryTotalCount}`
    );
    return response.data as OrderResponseType;
}

const getOrdersQueryNextPageParam = (lastPage:OrderResponseType, allPages:OrderResponseType[]) => getQueryNextPageParam<OrderResponseType>(lastPage, allPages)

const getOrdersQuerySelect = (data:InfiniteData<OrderResponseType, number>) => getQuerySelect<InfiniteData<OrderResponseType, number>>(data)

export const getOrdersQueryOptions = {
    getOrdersQueryKey,
    getOrdersInfiniteQueryKey,
    getOrdersQueryInitialPageParam,
    getOrdersQueryFn,
    getOrdersQueryNextPageParam,
    getOrdersQuerySelect
}