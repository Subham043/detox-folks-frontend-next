import { axiosPublic } from "../axios";
import { api_routes } from "../routes";
import { ProductResponseType } from "../types";

export const getProducts: (params: {
    pageParam?: any
})=>Promise<ProductResponseType> = async ({
    pageParam = 1
}: {
    pageParam?: any
}) => {
    const response = await axiosPublic.get(
        api_routes.products +
        `?page=${pageParam}&total=20&sort=name`
    );
    return response.data as ProductResponseType;
}