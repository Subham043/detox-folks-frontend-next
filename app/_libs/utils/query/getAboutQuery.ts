import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { AboutSectionType } from "../types";

const getAboutQueryKey = ["about"];

const getAboutQueryFn: () => Promise<AboutSectionType> = async () => {
    const response = await axiosPublic.get(api.about_section);
    return response.data.about as AboutSectionType;
}

export const getAboutQueryOptions = {
    getAboutQueryKey,
    getAboutQueryFn,
}