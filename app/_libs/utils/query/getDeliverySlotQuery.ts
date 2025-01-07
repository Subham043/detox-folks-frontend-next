import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { DeliverySlotResponseType } from "../types";

const getDeliverySlotQueryKey = ["delivery_slots"];

const getDeliverySlotQueryFn: () => Promise<DeliverySlotResponseType> = async () => {
    const response = await axiosPublic.get(api.delivery_slot);
    return response.data as DeliverySlotResponseType;
}

export const getDeliverySlotQueryOptions = {
    getDeliverySlotQueryKey,
    getDeliverySlotQueryFn,
}