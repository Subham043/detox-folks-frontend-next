import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { CategoryType } from "../types";

const getCategoryQueryKey = (slug: string) => ["category_"+slug];

const getCategoryQueryFn = async (slug: string) => {
    const response = await axiosPublic.get(
        api.categories +`/${slug}`
    );
    return response.data.category as CategoryType;
}

export const getCategoryQueryOptions = {
    getCategoryQueryKey,
    getCategoryQueryFn
}