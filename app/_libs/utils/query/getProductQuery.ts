import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { ProductType } from "../types";

const getProductQueryKey = (slug: string) => ["product_"+slug];

const getProductQueryFn = async (slug: string) => {
    const response = await axiosPublic.get(
        api.products +`/${slug}`
    );
    return response.data.product as ProductType;
}

export const getProductQueryOptions = {
    getProductQueryKey,
    getProductQueryFn
}