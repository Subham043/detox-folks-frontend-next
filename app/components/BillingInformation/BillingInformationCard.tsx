"use client";

import { BillingInformationType } from "@/app/utils/types";
import { FaUser } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import { axiosPublic } from "@/app/utils/axios";
import { api_routes } from "@/app/utils/api_routes";
import { useToast } from "@/app/hooks/useToast";
import EditBillingInformationDialog from "./EditBillingInformationDialog";
import { useBillingInformationMutation } from "@/app/utils/data-query/getBillingInformationsQuery";

export default function BillingInformationCard(props:BillingInformationType){
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {toastError, toastSuccess} = useToast();
    const {destroy} = useBillingInformationMutation();

    const deleteHandler = async () => {
        setLoading(true)
        try {
            const response = await axiosPublic.delete(api_routes.billing_information_delete+`/${props.id}`);
            toastSuccess(response.data.message);
            destroy(props.id)
        } catch (error) {
            console.log(error);
            toastError('Oops. something went wrong! please try again later.');
        }finally {
            setLoading(false)
        }
    }

    return <div className="py-2 px-3 bg-gray-100 rounded-sm">
        <div className=" flex justify-between items-center gap-1">
            <h3 className="text-lg font-semibold flex gap-2 items-center"><FaUser /> {props.name}</h3>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <BsThreeDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem><button className="w-full text-left" onClick={()=>setIsOpen(true)}>Edit</button></DropdownMenuItem>
                    <DropdownMenuItem><button disabled={loading} onClick={deleteHandler} className="w-full text-left">Delete</button></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <p>{props.email}</p>
        <p>{props.phone}</p>
        <p>{props.gst}</p>
        <EditBillingInformationDialog isOpen={isOpen} setIsOpen={setIsOpen} data={props} />
    </div>
}