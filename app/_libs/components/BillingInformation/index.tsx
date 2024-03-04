import { Dispatch, SetStateAction } from "react";
import AddBillingInformationDialog from "./AddBillingInformationDialog";
import BillingInformationSection from "./BillingInformationSection";

export default function BillingInformation({title='Billing Information', selectionAvailable=false, selectedItem, setSelectedItem}:{title?:string, selectionAvailable?:boolean, selectedItem?:number|undefined, setSelectedItem?:Dispatch<SetStateAction<number|undefined>>}){

    return <div className="w-full">
        <div className=" flex justify-between items-center mb-5">
            <h3 className=" text-xl text-black font-semibold">{title}</h3>
            <AddBillingInformationDialog />
        </div>
        <BillingInformationSection selectionAvailable={selectionAvailable} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    </div>
}