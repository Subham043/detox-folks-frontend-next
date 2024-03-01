"use client";

import { BillingAddressType } from "@/app/_libs/utils/types";
import { BsThreeDots } from "react-icons/bs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import { axiosPublic } from "@/app/_libs/utils/axios";
import { useToast } from "@/app/_libs/hooks/useToast";
import EditBillingAddressDialog from "./EditBillingAddressDialog";
import { useBillingAddressMutation } from "@/app/_libs/utils/query/getBillingAddressesQuery";
import { IoLocationSharp } from "react-icons/io5";
import { api } from "../../utils/routes/api";

export default function BillingAddressCard(props:BillingAddressType){
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {toastError, toastSuccess} = useToast();
    const {destroy} = useBillingAddressMutation();

    const deleteHandler = async () => {
        setLoading(true)
        try {
            const response = await axiosPublic.delete(api.billing_address_delete+`/${props.id}`);
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
        <div className=" flex justify-between items-start gap-1">
            <h3 className="text-lg font-semibold flex gap-2 items-start"><IoLocationSharp className=" mt-1" /> {props.country}</h3>
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
        {/* <p>{props.state}</p>
        <p>{props.city}</p>
        <p>{props.pin}</p> */}
        <p>{props.address}</p>
        <EditBillingAddressDialog isOpen={isOpen} setIsOpen={setIsOpen} data={props} />
    </div>
}