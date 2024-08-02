"use client";

import dynamic from 'next/dynamic'
import { FaAddressCard, FaSave } from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToast } from "@/app/_libs/hooks/useToast";
import { axiosPublic } from "@/app/_libs/utils/axios";
import Input from "@/app/_libs/components/Input";
import IconButton from "@/app/_libs/components/IconButton";
import { BillingAddressType, OlaAddres } from "@/app/_libs/utils/types";
import { useBillingAddressMutation } from "@/app/_libs/utils/query/getBillingAddressesQuery";
import Textarea from "../Textarea";
import { api } from "../../utils/routes/api";
import { IoLocationSharp } from 'react-icons/io5';
const Spinner = dynamic(() => import('../Spinner'));
const Map = dynamic(
  () => import('./Map'),
  { ssr: false, loading: () => <div className="w-full m-auto text-center"><Spinner type="default" color="black" /></div> }
)

type BillingAddressFormProps = {
    isOpen: boolean;
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

export default function BillingAddressForm({setIsOpen, type, data, isOpen}:BillingAddressFormProps){
    const { toastSuccess, toastError } = useToast();
    const {add, update} = useBillingAddressMutation();
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<undefined | {lat:number, lng:number}>();
    const [mapAddress, setMapAddress] = useState<undefined | OlaAddres>();
    const [displayMap, setDisplayMap] = useState<boolean>(false);

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
                const response = await axiosPublic.post(api.billing_address_create, {...getValues(), is_active:true, map_information:mapAddress});
                toastSuccess(response.data.message);
                add(response.data.billingAddress as BillingAddressType)
                reset()
            }else{
                const response = await axiosPublic.post(api.billing_address_update+`/${data.id}`, {...getValues(), is_active:true});
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

      useEffect(()=>{
        if(type==="update" && data && isOpen){
          setDisplayMap(false);
          setMapAddress(data.map_information ??  undefined)
          return;
        }
        if(type==="create" && isOpen){
          setDisplayMap(true);
          return;
        }

        return () => {
          setDisplayMap(false);
          setMapAddress(undefined)
        }

    }, [data, type, isOpen])

    return <>
        {
            displayMap ? 
            ((typeof window !== "undefined") && <Map isEdit={type==="update"} isModalOpen={isOpen} displayMap={displayMap} mapAddress={mapAddress} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} setMapAddress={setMapAddress} setConfirm={setDisplayMap} />) :
            <>
                {mapAddress && <div className="mt-2 w-full rounded-lg border-[#8c6d52] border-solid border">
                    <div className='w-full px-2 py-1 flex gap-2 justify-between items-center bg-[#8c6d52] rounded-t-lg'>
                        <h6 className='text-white flex gap-1 items-center'><IoLocationSharp className="text-xl" /><span>Selected Location</span></h6>
                        <button className="w-auto text-black bg-white text-sm text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600 hover:text-white" onClick={() => setDisplayMap(true)}>Change</button>
                    </div>
                    <div className="w-full px-2 py-1">
                        <p className="text-[#8c6d52] line-clamp-2">{mapAddress.description}</p>
                    </div>
                </div>}
                <form className="mt-3" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <Input Icon={FaAddressCard} placeholder="Your Country" register={register} errors={errors} name="country"  />
                    <Input Icon={FaAddressCard} placeholder="Your State" register={register} errors={errors} name="state" />
                    <Input Icon={FaAddressCard} placeholder="Your City" register={register} errors={errors} name="city" />
                    <Input Icon={FaAddressCard} placeholder="Your Pincode" register={register} errors={errors} name="pin" />
                    <Textarea Icon={FaAddressCard} placeholder="Your Address" register={register} errors={errors} name="address" />
                    <IconButton Icon={FaSave} text="SAVE ADDRESS" loading={loading} />
                </form>
            </>
        }
    </>
}