import { Dispatch, SetStateAction } from "react";
import DeliverySlotSection from "./DeliverySlotSection";

export default function DeliverySlot({title='Delivery Slot', selectionAvailable=false, selectedItem, setSelectedItem, allowCOD, setAllowCOD}:{title?:string, selectionAvailable?:boolean, selectedItem?:string|undefined, setSelectedItem?:Dispatch<SetStateAction<string|undefined>>, allowCOD: boolean, setAllowCOD: Dispatch<SetStateAction<boolean>>}){

    return <div className="w-full">
        <div className=" flex justify-between items-center mb-5">
            <h3 className=" text-base md:text-xl text-[#8c6d52] font-semibold">{title}</h3>
        </div>
        <DeliverySlotSection selectionAvailable={selectionAvailable} selectedItem={selectedItem} setSelectedItem={setSelectedItem} allowCOD={allowCOD} setAllowCOD={setAllowCOD} />
    </div>
}