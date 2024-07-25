"use client";

import {
    Dialog,
    DialogContent,
} from "@/app/_libs/components/ui/dialog"
import { Dispatch, SetStateAction, useState } from "react"
import { useToast } from "@/app/_libs/hooks/useToast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosPublic } from "@/app/_libs/utils/axios";
import { api } from "@/app/_libs/utils/routes/api";
import IconButton from "@/app/_libs/components/IconButton";
import { IoSend } from "react-icons/io5";
import Textarea from "@/app/_libs/components/Textarea";
import { MdOutlineMessage } from "react-icons/md";
import * as yup from "yup";

type SupportDialogProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    id: number | undefined
}

const schema = yup
  .object({
    message: yup.string().required(),
  })
  .required();

export default function SupportDialog({isOpen, setIsOpen, id}:SupportDialogProps){
 const { toastSuccess, toastError } = useToast();
 const [loading, setLoading] = useState(false);

 const {
        handleSubmit,
        register,
        getValues,
        setError,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
 });
 const onSubmit = async () => {
        setLoading(true);
        try {
         await axiosPublic.post(api.place_order_enquiry + `/${id}`, {...getValues(), is_active:true});
         toastSuccess("Thank you for contacting us. Our team will get back to you soon.");
         reset()
         setIsOpen(false)
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.message) {
            setError("message", {
              type: "server",
              message: error?.response?.data?.errors?.message[0],
            });
          }
        } finally {
          setLoading(false);
        }
      };
    return <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
        <DialogContent className="p-0">
            <div className=" w-full px-4 py-3">
                <h3 className=" text-lg font-semibold">Please describe your query related to the order</h3>
                <form className="mt-3" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <Textarea Icon={MdOutlineMessage} placeholder="Your Message" register={register} errors={errors} name="message" />
                    <IconButton Icon={IoSend} text="SEND MESSAGE" loading={loading} />
                </form>
            </div>
        </DialogContent>
    </Dialog>
}