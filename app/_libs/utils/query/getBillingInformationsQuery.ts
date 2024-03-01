import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { BillingInformationResponseType, BillingInformationType } from "../types";
import getQueryClient from "./getQueryClient";

type BillingInformationMutationHookType = () => {
    add: (newData:BillingInformationType)=>void;
    update: (updateData:BillingInformationType)=>void;
    destroy: (id: number)=>void;
}

const getBillingInformationsQueryKey = ["billing_informations"];

const getBillingInformationsQueryFn: () => Promise<BillingInformationResponseType> = async () => {
    const response = await axiosPublic.get(api.billing_information_all);
    return response.data as BillingInformationResponseType;
}

export const getBillingInformationsQueryOptions = {
    getBillingInformationsQueryKey,
    getBillingInformationsQueryFn,
}


export const useBillingInformationMutation:BillingInformationMutationHookType = () => {
    const queryClient = getQueryClient()

    const add:(newData:BillingInformationType)=>void = (newData:BillingInformationType) => {
        queryClient.setQueryData<BillingInformationResponseType | undefined>(getBillingInformationsQueryKey, (billingInfoData) => {
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
    
    const update:(updateData:BillingInformationType)=>void = (updateData:BillingInformationType) => {
        queryClient.setQueryData<BillingInformationResponseType | undefined>(getBillingInformationsQueryKey, (billingInfoData) => {
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
            console.log(updateData)
            return data;
        });
    }
    
    const destroy:(id:number)=>void = (id:number) => {
        queryClient.setQueryData<BillingInformationResponseType | undefined>(getBillingInformationsQueryKey, (billingInfoData) => {
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