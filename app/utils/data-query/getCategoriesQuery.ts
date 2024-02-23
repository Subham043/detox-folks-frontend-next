import { InfiniteData } from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import { api_routes } from "../api_routes";
import { CategoryResponseType } from "../types";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "../constants";

const getCategoriesQueryKey = ["categories"];
const getCategoriesInfiniteQueryKey = ["categories_infinite"];
const getCategoriesQueryInitialPageParam = getQueryInitialPageParam;

const getCategoriesQueryFn: (params: {
    pageParam?: any
})=>Promise<CategoryResponseType> = async ({
    pageParam = 1
}: {
    pageParam?: any
}) => {
    const response = await axiosPublic.get(
        api_routes.categories +
        `?page=${pageParam}&total=${getQueryTotalCount}&sort=id`
    );
    return response.data as CategoryResponseType;
}

const getCategoriesQueryNextPageParam = (lastPage:CategoryResponseType, allPages:CategoryResponseType[]) => getQueryNextPageParam<CategoryResponseType>(lastPage, allPages)

const getCategoriesQuerySelect = (data:InfiniteData<CategoryResponseType, number>) => getQuerySelect<InfiniteData<CategoryResponseType, number>>(data)

export const getCategoriesQueryOptions = {
    getCategoriesQueryKey,
    getCategoriesInfiniteQueryKey,
    getCategoriesQueryInitialPageParam,
    getCategoriesQueryFn,
    getCategoriesQueryNextPageParam,
    getCategoriesQuerySelect
}