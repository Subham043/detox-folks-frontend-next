"use client";

import { FaAddressCard, FaSave } from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/app/hooks/useToast";
import { axiosPublic } from "@/app/utils/axios";
import { api_routes } from "@/app/utils/api_routes";
import Input from "@/app/components/Input";
import IconButton from "@/app/components/IconButton";
import { BillingAddressType } from "@/app/utils/types";
import { useBillingAddressMutation } from "@/app/utils/data-query/getBillingAddressesQuery";
import Textarea from "../Textarea";

type BillingAddressFormProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
} & (
    {
        type: 'create';
        data: undefined
    } |
    {
        type: 'update';
        data: BillingAddressType
    }
)

const schema = yup
  .object({
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    pin: yup
        .string()
        .required(),
  })
  .required();

export default function BillingAddressForm({setIsOpen, type, data}:BillingAddressFormProps){
    const { toastSuccess, toastError } = useToast();
    const {add, update} = useBillingAddressMutation();
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
            country: data.country,
            state: data.state,
            city: data.city,
            pin: data.pin.toString(),
            address: data.address,
        }: {
            country: '',
            state: '',
            pin: '',
            city: '',
            address: '',
        }
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
            if(type==='create'){
                const response = await axiosPublic.post(api_routes.billing_address_create, {...getValues(), is_active:true});
                toastSuccess(response.data.message);
                add(response.data.billingAddress as BillingAddressType)
                reset()
            }else{
                const response = await axiosPublic.post(api_routes.billing_address_update+`/${data.id}`, {...getValues(), is_active:true});
                toastSuccess(response.data.message);
                update(response.data.billingAddress as BillingAddressType)
            }
            setIsOpen(false)
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.country) {
            setError("country", {
                type: "server",
                message: error?.response?.data?.errors?.country[0],
            });
          }
          if (error?.response?.data?.errors?.state) {
              setError("state", {
                  type: "server",
                  message: error?.response?.data?.errors?.state[0],
              });
          }
          if (error?.response?.data?.errors?.city) {
              setError("city", {
                  type: "server",
                  message: error?.response?.data?.errors?.city[0],
              });
          }
          if (error?.response?.data?.errors?.address) {
              setError("address", {
                  type: "server",
                  message: error?.response?.data?.errors?.address[0],
              });
          }
          if (error?.response?.data?.errors?.pin) {
              setError("pin", {
                  type: "server",
                  message: error?.response?.data?.errors?.pin[0],
              });
          }
        } finally {
          setLoading(false);
        }
      };

    return <form className="mt-3" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Input Icon={FaAddressCard} placeholder="Your Country" register={register} errors={errors} name="country"  />
        <Input Icon={FaAddressCard} placeholder="Your State" register={register} errors={errors} name="state" />
        <Input Icon={FaAddressCard} placeholder="Your City" register={register} errors={errors} name="city" />
        <Input Icon={FaAddressCard} placeholder="Your Pincode" register={register} errors={errors} name="pin" />
        <Textarea Icon={FaAddressCard} placeholder="Your Address" register={register} errors={errors} name="address" />
        <IconButton Icon={FaSave} text="SAVE ADDRESS" loading={loading} />
    </form>
}