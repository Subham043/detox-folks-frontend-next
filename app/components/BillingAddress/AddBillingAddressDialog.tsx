"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/app/components/ui/dialog"
import BillingAddressForm from "./BillingAddressForm"
import { useState } from "react"

export default function AddBillingAddressDialog(){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
        <DialogTrigger asChild>
            <button className=" py-1 px-3 bg-black text-white text-center font-semibold rounded-sm" onClick={()=>setIsOpen(true)}>ADD ADDRESS</button>
        </DialogTrigger>
        <DialogContent className="p-0">
            <div className=" w-full px-4 py-3">
                <h3 className=" text-lg font-semibold">Add Address</h3>
                <BillingAddressForm setIsOpen={setIsOpen} type="create" data={undefined} />
            </div>
        </DialogContent>
    </Dialog>
}