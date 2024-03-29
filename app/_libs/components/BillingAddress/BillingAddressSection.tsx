"use client";

import { useQuery } from "@tanstack/react-query";
import BillingAddressCard from "./BillingAddressCard";
import { getBillingAddressesQueryOptions } from "@/app/_libs/utils/query/getBillingAddressesQuery";
import { Dispatch, SetStateAction, useEffect } from "react";
import BillingAddressLoading from "./BillingAddressLoading";

export default function BillingAddressSection({selectionAvailable, selectedItem, setSelectedItem}:{selectionAvailable:boolean, selectedItem?:number|undefined, setSelectedItem?:Dispatch<SetStateAction<number|undefined>>}){
    const {
        data,
        isFetching,
        isRefetching
    } = useQuery({
        queryKey: getBillingAddressesQueryOptions.getBillingAddressesQueryKey,
        queryFn: getBillingAddressesQueryOptions.getBillingAddressesQueryFn,
    })
    
    useEffect(() => {
        if(selectionAvailable && setSelectedItem){
            if(data && data.data.length>0){
                setSelectedItem(data.data[0].id)
            }else{
                setSelectedItem(undefined)
            }
        }
    }, [data, selectionAvailable])

    return <div className=" flex flex-wrap gap-5 justify-between items-start mb-5">
            {(isFetching || isRefetching) ? <BillingAddressLoading /> : 
                ((data ? data.data : []).length>0 ? (data ? data.data : []).map((item, i) => <div className="w-full lg:w-[48%]" key={i}>
                    <BillingAddressCard {...item} selectionAvailable={selectionAvailable} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </div>) :
                <div className=" text-center w-full">
                    <p>No Address Available. Kindly add one!</p>
                </div>)
            }
        </div>
}