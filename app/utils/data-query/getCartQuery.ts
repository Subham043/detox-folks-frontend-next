import { axiosPublic } from "../axios";
import { api_routes } from "../api_routes";
import { CartType } from "@/app/context/CartProvider";

const getCartQueryKey = ["cart"];

const getCartQueryFn: () => Promise<CartType> = async () => {
    const response = await axiosPublic.get(api_routes.cart_all);
    return response.data as CartType;
}

export const getCartQueryOptions = {
    getCartQueryKey,
    getCartQueryFn,
}