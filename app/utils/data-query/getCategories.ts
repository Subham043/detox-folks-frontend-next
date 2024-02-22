import { axiosPublic } from "../axios";
import { api_routes } from "../routes";
import { CategoryResponseType } from "../types";

export const getCategories: (params: {
    pageParam?: any
})=>Promise<CategoryResponseType> = async ({
    pageParam = 1
}: {
    pageParam?: any
}) => {
    const response = await axiosPublic.get(
        api_routes.categories +
        `?page=${pageParam}&total=10&sort=id`
    );
    return response.data as CategoryResponseType;
}