"use client";

import { useQuery } from "@tanstack/react-query";
import BillingInformationCard from "./BillingInformationCard";
import { getBillingInformationsQueryOptions } from "@/app/_libs/utils/query/getBillingInformationsQuery";
import { Dispatch, SetStateAction, useEffect } from "react";
import BillingInformationLoading from "./BillingInformationLoading";

export default function BillingInformationSection({selectionAvailable, selectedItem, setSelectedItem}:{selectionAvailable:boolean, selectedItem?:number|undefined, setSelectedItem?:Dispatch<SetStateAction<number|undefined>>}){
    const {
        data,
        isFetching,
        isRefetching
    } = useQuery({
        queryKey: getBillingInformationsQueryOptions.getBillingInformationsQueryKey,
        queryFn: getBillingInformationsQueryOptions.getBillingInformationsQueryFn,
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
            {(isFetching || isRefetching) ? <BillingInformationLoading /> :
                ((data ? data.data : []).length>0 ?(data ? data.data : []).map((item, i) => <div className="w-full lg:w-[48%]" key={i}>
                    <BillingInformationCard {...item} selectionAvailable={selectionAvailable} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </div>) :
                <div className=" text-center w-full">
                    <p>No Information Available. Kindly add one!</p>
                </div>)
            }
        </div>
}