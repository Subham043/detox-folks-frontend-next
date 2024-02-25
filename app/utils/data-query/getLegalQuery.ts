import { axiosPublic } from "../axios";
import { api_routes } from "../api_routes";
import { LegalType } from "../types";

const getLegalQueryKey = (slug:string) => ["legal_"+slug];

const getLegalQueryFn: (slug:string) => Promise<LegalType> = async (slug) => {
    const response = await axiosPublic.get(api_routes.legal + `/${slug}`);
    return response.data.legal as LegalType;
}

export const getLegalQueryOptions = {
    getLegalQueryKey,
    getLegalQueryFn,
}