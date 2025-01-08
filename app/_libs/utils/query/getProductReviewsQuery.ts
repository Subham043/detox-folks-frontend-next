import { InfiniteData } from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import { ProductReviewResponseType } from "../types";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "../contants/queryOptions";
import { api } from "../routes/api";

const getProductReviewQueryKey = (slug: string) => ["product_reviews", slug];
const getProductReviewQueryInitialPageParam = getQueryInitialPageParam;

export const getProductReviewQueryFn: (params: {
    pageParam?: any;
    slug: string;
})=>Promise<ProductReviewResponseType> = async ({
    pageParam = 1,
    slug
}: {
    pageParam?: any;
    slug: string;
}) => {
    const response = await axiosPublic.get(
        api.products +
        `/${slug}/reviews?page=${pageParam}&total=10`
    );
    return response.data as ProductReviewResponseType;
}

const getProductReviewQueryNextPageParam = (lastPage:ProductReviewResponseType, allPages:ProductReviewResponseType[]) => getQueryNextPageParam<ProductReviewResponseType>(lastPage, allPages)

const getProductReviewQuerySelect = (data:InfiniteData<ProductReviewResponseType, number>) => getQuerySelect<InfiniteData<ProductReviewResponseType, number>>(data)

export const getProductReviewQueryOptions = {
    getProductReviewQueryKey,
    getProductReviewQueryInitialPageParam,
    getProductReviewQueryFn,
    getProductReviewQueryNextPageParam,
    getProductReviewQuerySelect
}