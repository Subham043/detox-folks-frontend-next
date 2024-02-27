import { axiosPublic } from "../axios";
import { api_routes } from "../api_routes";
import { BillingAddressResponseType, BillingAddressType } from "../types";
import getQueryClient from "./getQueryClient";

type BillingAddressMutationHookType = () => {
    add: (newData:BillingAddressType)=>void;
    update: (updateData:BillingAddressType)=>void;
    destroy: (id: number)=>void;
}

const getBillingAddressesQueryKey = ["billing_addresses"];

const getBillingAddressesQueryFn: () => Promise<BillingAddressResponseType> = async () => {
    const response = await axiosPublic.get(api_routes.billing_address_all);
    return response.data as BillingAddressResponseType;
}

export const getBillingAddressesQueryOptions = {
    getBillingAddressesQueryKey,
    getBillingAddressesQueryFn,
}


export const useBillingAddressMutation:BillingAddressMutationHookType = () => {
    const queryClient = getQueryClient()

    const add:(newData:BillingAddressType)=>void = (newData:BillingAddressType) => {
        queryClient.setQueryData<BillingAddressResponseType | undefined>(getBillingAddressesQueryKey, (billingInfoData) => {
            const data = billingInfoData;
            if(data){
                return {
                    ...data,
                    data: [newData, ...data.data]
                };
            }
            return data;
        });
    }
    
    const update:(updateData:BillingAddressType)=>void = (updateData:BillingAddressType) => {
        queryClient.setQueryData<BillingAddressResponseType | undefined>(getBillingAddressesQueryKey, (billingInfoData) => {
            const data = billingInfoData;
            if(data && billingInfoData){
                const key = data.data.findIndex((item) => item.id===updateData.id)
                if(key>-1){
                    const newUpdatedData = [...data.data]
                    newUpdatedData[key] = {...updateData};
                    return {
                        ...data,
                        data: [...newUpdatedData]
                    }
                }
            }
            return data;
        });
    }
    
    const destroy:(id:number)=>void = (id:number) => {
        queryClient.setQueryData<BillingAddressResponseType | undefined>(getBillingAddressesQueryKey, (billingInfoData) => {
            const data = billingInfoData;
            if(data){
                return {
                    ...data,
                    data: [...data.data.filter((item) => item.id!==id)]
                }
            }
            return data;
        });
    }

    return {
        add,
        update,
        destroy
    }
}