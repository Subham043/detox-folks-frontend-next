import { InfiniteData } from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import { BlogResponseType } from "../types";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "../contants/queryOptions";
import { api } from "../routes/api";

const getBlogsQueryKey = ["blogs"];
const getBlogsInfiniteQueryKey = ["blogs_infinite"];
const getBlogsQueryInitialPageParam = getQueryInitialPageParam;

const getBlogsQueryFn: (params: {
    pageParam?: any
})=>Promise<BlogResponseType> = async ({
    pageParam = 1
}: {
    pageParam?: any
}) => {
    const response = await axiosPublic.get(
        api.blog +
        `?page=${pageParam}&total=${getQueryTotalCount}&sort=-id`
    );
    return response.data as BlogResponseType;
}

const getBlogsQueryNextPageParam = (lastPage:BlogResponseType, allPages:BlogResponseType[]) => getQueryNextPageParam<BlogResponseType>(lastPage, allPages)

const getBlogsQuerySelect = (data:InfiniteData<BlogResponseType, number>) => getQuerySelect<InfiniteData<BlogResponseType, number>>(data)

export const getBlogsQueryOptions = {
    getBlogsQueryKey,
    getBlogsInfiniteQueryKey,
    getBlogsQueryInitialPageParam,
    getBlogsQueryFn,
    getBlogsQueryNextPageParam,
    getBlogsQuerySelect
}