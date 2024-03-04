import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { OrderType } from "../types";

const getOrderQueryKey = (slug: number) => ["order_"+slug];

const getOrderQueryFn = async (slug: number) => {
    const response = await axiosPublic.get(
        api.place_order_detail +`/${slug}`
    );
    return response.data.order as OrderType;
}

export const getOrderQueryOptions = {
    getOrderQueryKey,
    getOrderQueryFn
}