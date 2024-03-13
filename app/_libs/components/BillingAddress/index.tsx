import { Dispatch, SetStateAction } from "react";
import AddBillingAddressDialog from "./AddBillingAddressDialog";
import BillingAddressSection from "./BillingAddressSection";

export default function BillingAddress({title='Billing Address', selectionAvailable=false, selectedItem, setSelectedItem}:{title?:string, selectionAvailable?:boolean, selectedItem?:number|undefined, setSelectedItem?:Dispatch<SetStateAction<number|undefined>>}){

    return <div className="w-full">
        <div className=" flex justify-between items-center mb-5">
            <h3 className=" text-base md:text-xl text-black font-semibold">{title}</h3>
            <AddBillingAddressDialog />
        </div>
        <BillingAddressSection selectionAvailable={selectionAvailable} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    </div>
}