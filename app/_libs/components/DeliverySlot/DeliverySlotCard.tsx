"use client";

import { DeliverySlotType } from "@/app/_libs/utils/types";
import { FaClock } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";

export default function DeliverySlotCard(props:DeliverySlotType & {selectionAvailable:boolean, selectedItem?:string|undefined, setSelectedItem?:Dispatch<SetStateAction<string|undefined>>, allowCOD: boolean, setAllowCOD: Dispatch<SetStateAction<boolean>>}){

    const selectionHandler = (data:{name:string, is_cod_allowed:boolean}) => {
        if(props.selectionAvailable && props.setSelectedItem){
            props.setSelectedItem(data.name)
            props.setAllowCOD(data.is_cod_allowed)
        }
    }

    return <div onClick={()=>selectionHandler({name: props.name, is_cod_allowed: props.is_cod_allowed})} className={`py-2 px-3 bg-[#ede1d736] rounded-sm text-left w-full ${(props.selectionAvailable && props.selectedItem && props.selectedItem===props.name) ? 'border border-dashed border-gray-500' : 'cursor-pointer'} `}>
        <div className=" flex justify-between items-start gap-1">
            <h3 className="text-lg font-semibold flex gap-2 items-start"><FaClock className=" mt-1" /> {props.name}</h3>
        </div>
    </div>
}