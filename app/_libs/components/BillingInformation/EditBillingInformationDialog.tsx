"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/app/_libs/components/ui/dialog"
import BillingInformationForm from "./BillingInformationForm"
import { Dispatch, SetStateAction } from "react"
import { BillingInformationType } from "@/app/_libs/utils/types";

type EditBillingInformationDialogProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    data: BillingInformationType
}

export default function EditBillingInformationDialog({isOpen, setIsOpen, data}:EditBillingInformationDialogProps){
    return <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
        <DialogContent className="p-0">
            <div className=" w-full px-4 py-3">
                <h3 className=" text-lg font-semibold">Edit Information</h3>
                <BillingInformationForm setIsOpen={setIsOpen} type="update" data={data} />
            </div>
        </DialogContent>
    </Dialog>
}