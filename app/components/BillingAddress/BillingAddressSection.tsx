"use client";

import { useQuery } from "@tanstack/react-query";
import BillingAddressCard from "./BillingAddressCard";
import { getBillingAddressesQueryOptions } from "@/app/utils/data-query/getBillingAddressesQuery";

export default function BillingAddressSection(){
    const {
        data
    } = useQuery({
        queryKey: getBillingAddressesQueryOptions.getBillingAddressesQueryKey,
        queryFn: getBillingAddressesQueryOptions.getBillingAddressesQueryFn,
    })
    
    return <div className=" flex flex-wrap gap-5 justify-between items-start mb-5">
            {
                (data ? data.data : []).map((item, i) => <div className=" w-[48%]" key={i}>
                    <BillingAddressCard {...item} />
                </div>)
            }
        </div>
}