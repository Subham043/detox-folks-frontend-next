"use client";

import { FaAddressCard, FaPhoneAlt, FaSave, FaUser } from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useState } from "react";
import { MdEmail } from "react-icons/md";
import { useToast } from "@/app/_libs/hooks/useToast";
import { axiosPublic } from "@/app/_libs/utils/axios";
import Input from "@/app/_libs/components/Input";
import IconButton from "@/app/_libs/components/IconButton";
import { BillingInformationType } from "@/app/_libs/utils/types";
import { useBillingInformationMutation } from "@/app/_libs/utils/query/getBillingInformationsQuery";
import { api } from "../../utils/routes/api";

type BillingInformationFormProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
} & (
    {
        type: 'create';
        data: undefined
    } |
    {
        type: 'update';
        data: BillingInformationType
    }
)

const schema = yup
  .object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    phone: yup
        .string()
        .required()
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
    gst: yup.string(),
  })
  .required();

export default function BillingInformationForm({setIsOpen, type, data}:BillingInformationFormProps){
    const { toastSuccess, toastError } = useToast();
    const {add, update} = useBillingInformationMutation();
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
        values: type==='update' && data ? {
            name: data.name,
            email: data.email,
            phone: data.phone.toString(),
            gst: data.gst ? data.gst : undefined,
        }: {
            name: '',
            email: '',
            phone: '',
            gst: undefined,
        }
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
            if(type==='create'){
                const response = await axiosPublic.post(api.billing_information_create, {...getValues(), is_active:true});
                toastSuccess(response.data.message);
                add(response.data.billingInformation as BillingInformationType)
                reset()
            }else{
                const response = await axiosPublic.post(api.billing_information_update+`/${data.id}`, {...getValues(), is_active:true});
                toastSuccess(response.data.message);
                update(response.data.billingInformation as BillingInformationType)
            }
            setIsOpen(false)
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.name) {
            setError("name", {
              type: "server",
              message: error?.response?.data?.errors?.name[0],
            });
          }
          if (error?.response?.data?.errors?.email) {
            setError("email", {
              type: "server",
              message: error?.response?.data?.errors?.email[0],
            });
          }
          if (error?.response?.data?.errors?.phone) {
            setError("phone", {
              type: "server",
              message: error?.response?.data?.errors?.phone[0],
            });
          }
          if (error?.response?.data?.errors?.gst) {
            setError("gst", {
              type: "server",
              message: error?.response?.data?.errors?.gst[0],
            });
          }
        } finally {
          setLoading(false);
        }
      };

    return <form className="mt-3" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Input Icon={FaUser} placeholder="Your Name" register={register} errors={errors} name="name"  />
        <Input Icon={MdEmail} type="email" placeholder="Your Email" register={register} errors={errors} name="email" />
        <Input Icon={FaPhoneAlt} placeholder="Your Phone" register={register} errors={errors} name="phone" />
        <Input Icon={FaAddressCard} placeholder="Your GST" register={register} errors={errors} name="gst" />
        <IconButton Icon={FaSave} text="SAVE INFORMATION" loading={loading} />
    </form>
}