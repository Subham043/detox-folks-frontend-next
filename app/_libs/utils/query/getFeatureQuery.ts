import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { FeatureResponseType } from "../types";

const getFeatureQueryKey = ["features"];

const getFeatureQueryFn: () => Promise<FeatureResponseType> = async () => {
    const response = await axiosPublic.get(api.feature);
    return response.data as FeatureResponseType;
}

export const getFeatureQueryOptions = {
    getFeatureQueryKey,
    getFeatureQueryFn,
}