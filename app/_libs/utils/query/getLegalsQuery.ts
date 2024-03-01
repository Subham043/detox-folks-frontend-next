import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { LegalResponseType } from "../types";

const getLegalsQueryKey = ["legals"];

const getLegalsQueryFn: () => Promise<LegalResponseType> = async () => {
    const response = await axiosPublic.get(api.legal);
    return response.data as LegalResponseType;
}

export const getLegalsQueryOptions = {
    getLegalsQueryKey,
    getLegalsQueryFn,
}