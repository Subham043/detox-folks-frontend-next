import { axiosPublic } from "../axios";
import { api_routes } from "../api_routes";
import { LegalResponseType } from "../types";

const getLegalsQueryKey = ["legals"];

const getLegalsQueryFn: () => Promise<LegalResponseType> = async () => {
    const response = await axiosPublic.get(api_routes.legal);
    return response.data as LegalResponseType;
}

export const getLegalsQueryOptions = {
    getLegalsQueryKey,
    getLegalsQueryFn,
}