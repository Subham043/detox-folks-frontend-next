import { axiosPublic } from "../axios";
import { api_routes } from "../api_routes";
import { FeatureResponseType } from "../types";

const getFeatureQueryKey = ["features"];

const getFeatureQueryFn: () => Promise<FeatureResponseType> = async () => {
    const response = await axiosPublic.get(api_routes.feature);
    return response.data as FeatureResponseType;
}

export const getFeatureQueryOptions = {
    getFeatureQueryKey,
    getFeatureQueryFn,
}