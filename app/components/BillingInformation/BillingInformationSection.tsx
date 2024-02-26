"use client";

import { useQuery } from "@tanstack/react-query";
import BillingInformationCard from "./BillingInformationCard";
import { getBillingInformationsQueryOptions } from "@/app/utils/data-query/getBillingInformationsQuery";

export default function BillingInformationSection(){
    const {
        data
    } = useQuery({
        queryKey: getBillingInformationsQueryOptions.getBillingInformationsQueryKey,
        queryFn: getBillingInformationsQueryOptions.getBillingInformationsQueryFn,
    })
    
    return <div className=" flex flex-wrap gap-5 justify-between items-start mb-5">
            {
                (data ? data.data : []).map((item, i) => <div className=" w-[48%]" key={i}>
                    <BillingInformationCard {...item} />
                </div>)
            }
        </div>
}