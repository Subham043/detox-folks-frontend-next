import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { BlogType } from "../types";

const getBlogQueryKey = (slug: string) => ["blog_"+slug];

const getBlogQueryFn = async (slug: string) => {
    const response = await axiosPublic.get(
        api.blog +`/${slug}`
    );
    return response.data.blog as BlogType;
}

export const getBlogQueryOptions = {
    getBlogQueryKey,
    getBlogQueryFn
}