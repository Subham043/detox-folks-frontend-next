"use client";

import { useQuery } from "@tanstack/react-query";
import BillingAddressCard from "./BillingAddressCard";
import { getBillingAddressesQueryOptions } from "@/app/_libs/utils/query/getBillingAddressesQuery";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function BillingAddressSection({selectionAvailable, selectedItem, setSelectedItem}:{selectionAvailable:boolean, selectedItem?:number|undefined, setSelectedItem?:Dispatch<SetStateAction<number|undefined>>}){
    const {
        data
    } = useQuery({
        queryKey: getBillingAddressesQueryOptions.getBillingAddressesQueryKey,
        queryFn: getBillingAddressesQueryOptions.getBillingAddressesQueryFn,
    })
    
    useEffect(() => {
        if(selectionAvailable && setSelectedItem && data && data.data.length>0){
            setSelectedItem(data.data[0].id)
        }
    }, [data, selectionAvailable])

    return <div className=" flex flex-wrap gap-5 justify-between items-start mb-5">
            {
                (data ? data.data : []).length>0 ? (data ? data.data : []).map((item, i) => <div className="w-full lg:w-[48%]" key={i}>
                    <BillingAddressCard {...item} selectionAvailable={selectionAvailable} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </div>) :
                <div className=" text-center w-full">
                    <p>No Address Available. Kindly add one!</p>
                </div>
            }
        </div>
}