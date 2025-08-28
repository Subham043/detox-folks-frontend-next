import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { BannerType } from "../types";

const getHomePageBannerQueryKey = ["home_page_banners"];

const getHomePageBannerQueryFn: () => Promise<BannerType[]> = async () => {
    const response = await axiosPublic.get(api.home_page_banner);
    return response.data.banner as BannerType[];
}

export const getHomePageBannerQueryOptions = {
    getHomePageBannerQueryKey,
    getHomePageBannerQueryFn,
}