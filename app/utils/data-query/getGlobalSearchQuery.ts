import { InfiniteData } from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import { api_routes } from "../api_routes";
import { GlobalSearchResponseType } from "../types";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "../constants";

const getGlobalSearchQueryKey = (search: string) => ["global_search", search];
const getGlobalSearchQueryInitialPageParam = getQueryInitialPageParam;

export const getGlobalSearchQueryFn: (params: {
    pageParam?: any;
    search: string;
})=>Promise<GlobalSearchResponseType> = async ({
    pageParam = 1,
    search
}: {
    pageParam?: any;
    search: string;
}) => {
    const response = await axiosPublic.get(
        api_routes.global_search +
        `?page=${pageParam}&total=${getQueryTotalCount}${search === "" ? "" : "&filter[search]=" + search}`
    );
    return response.data as GlobalSearchResponseType;
}

const getGlobalSearchQueryNextPageParam = (lastPage:GlobalSearchResponseType, allPages:GlobalSearchResponseType[]) => getQueryNextPageParam<GlobalSearchResponseType>(lastPage, allPages)

const getGlobalSearchQuerySelect = (data:InfiniteData<GlobalSearchResponseType, number>) => getQuerySelect<InfiniteData<GlobalSearchResponseType, number>>(data)

export const getGlobalSearchQueryOptions = {
    getGlobalSearchQueryKey,
    getGlobalSearchQueryInitialPageParam,
    getGlobalSearchQueryFn,
    getGlobalSearchQueryNextPageParam,
    getGlobalSearchQuerySelect
}