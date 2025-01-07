"use client";

import { useQuery } from "@tanstack/react-query";
import DeliverySlotCard from "./DeliverySlotCard";
import { Dispatch, SetStateAction, useEffect } from "react";
import DeliverySlotLoading from "./DeliverySlotLoading";
import { getDeliverySlotQueryOptions } from "../../utils/query/getDeliverySlotQuery";

export default function DeliverySlotSection({selectionAvailable, selectedItem, setSelectedItem, allowCOD, setAllowCOD}:{selectionAvailable:boolean, selectedItem?:string|undefined, setSelectedItem?:Dispatch<SetStateAction<string|undefined>>, allowCOD: boolean, setAllowCOD: Dispatch<SetStateAction<boolean>>}){
    const {
        data,
        isFetching,
        isRefetching
    } = useQuery({
        queryKey: getDeliverySlotQueryOptions.getDeliverySlotQueryKey,
        queryFn: getDeliverySlotQueryOptions.getDeliverySlotQueryFn,
    })

    useEffect(() => {
        if(selectionAvailable && setSelectedItem){
            if(data && data.delivery_slot.length>0){
                setSelectedItem(data.delivery_slot[0].name)
                setAllowCOD(data.delivery_slot[0].is_cod_allowed)
            }else{
                setSelectedItem(undefined)
                setAllowCOD(true)
            }
        }
    }, [data, selectionAvailable])
    
    return <div className=" flex flex-wrap gap-5 justify-between items-start mb-5">
            {(isFetching || isRefetching) ? <DeliverySlotLoading /> :
                ((data ? data.delivery_slot : []).length>0 ?(data ? data.delivery_slot : []).map((item, i) => <div className="w-full lg:w-[48%]" key={i}>
                    <DeliverySlotCard {...item} selectionAvailable={selectionAvailable} selectedItem={selectedItem} setSelectedItem={setSelectedItem} allowCOD={allowCOD} setAllowCOD={setAllowCOD} />
                </div>) :
                <div className=" text-center w-full">
                    <p>No Slots Available.</p>
                </div>)
            }
        </div>
}