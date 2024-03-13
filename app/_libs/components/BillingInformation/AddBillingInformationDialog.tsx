"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/app/_libs/components/ui/dialog"
import BillingInformationForm from "./BillingInformationForm"
import { useState } from "react"

export default function AddBillingInformationDialog(){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
        <DialogTrigger asChild>
            <button className=" text-sm md:text-base py-1 px-3 bg-black text-white text-center font-semibold rounded-sm transition-all hover:bg-gray-600" onClick={()=>setIsOpen(true)}>ADD INFO</button>
        </DialogTrigger>
        <DialogContent className="p-0">
            <div className=" w-full px-4 py-3">
                <h3 className=" text-lg font-semibold">Add Information</h3>
                <BillingInformationForm setIsOpen={setIsOpen} type="create" data={undefined} />
            </div>
        </DialogContent>
    </Dialog>
}