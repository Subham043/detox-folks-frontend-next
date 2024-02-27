import { axiosPublic } from "../axios";
import { api_routes } from "../api_routes";
import { CartType } from "@/app/context/CartProvider";
import getQueryClient from "./getQueryClient";

type CartMutationHookType = () => {
    update: (updateData:CartType)=>void;
}

const getCartQueryKey = ["cart"];

const getCartQueryFn: () => Promise<CartType> = async () => {
    const response = await axiosPublic.get(api_routes.cart_all);
    return response.data as CartType;
}

export const getCartQueryOptions = {
    getCartQueryKey,
    getCartQueryFn,
}

export const useCartMutation:CartMutationHookType = () => {
    const queryClient = getQueryClient()

    const update:(updateData:CartType)=>void = (updateData:CartType) => {
        queryClient.setQueryData<CartType | undefined>(getCartQueryKey, () => {
            return {...updateData}
        });
    }

    return {
        update
    }
}