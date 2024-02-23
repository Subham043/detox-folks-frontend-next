import { axiosPublic } from "../axios";
import { api_routes } from "../api_routes";
import { AboutSectionType } from "../types";

const getAboutQueryKey = ["about"];

const getAboutQueryFn: () => Promise<AboutSectionType> = async () => {
    const response = await axiosPublic.get(api_routes.about_section);
    return response.data.about as AboutSectionType;
}

export const getAboutQueryOptions = {
    getAboutQueryKey,
    getAboutQueryFn,
}