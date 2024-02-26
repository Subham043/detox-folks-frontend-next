"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/app/components/ui/dialog"
import BillingAddressForm from "./BillingAddressForm"
import { Dispatch, SetStateAction } from "react"
import { BillingAddressType } from "@/app/utils/types";

type EditBillingAddressDialogProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    data: BillingAddressType
}

export default function EditBillingAddressDialog({isOpen, setIsOpen, data}:EditBillingAddressDialogProps){
    return <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
        <DialogContent className="p-0">
            <div className=" w-full px-4 py-3">
                <h3 className=" text-lg font-semibold">Edit Information</h3>
                <BillingAddressForm setIsOpen={setIsOpen} type="update" data={data} />
            </div>
        </DialogContent>
    </Dialog>
}