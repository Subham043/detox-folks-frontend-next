import { axiosPublic } from "../axios";
import { api_routes } from "../routes";
import { GlobalSearchResponseType } from "../types";

export const getGlobalSearch: (params: {
    pageParam?: any;
    search: string;
})=>Promise<GlobalSearchResponseType> = async ({
    pageParam = 1,
    search
}: {
    pageParam?: any;
    search: string;
}) => {
    const response = await axiosPublic.get(
        api_routes.global_search +
        `?page=${pageParam}&total=20${search === "" ? "" : "&filter[search]=" + search}`
    );
    return response.data as GlobalSearchResponseType;
}