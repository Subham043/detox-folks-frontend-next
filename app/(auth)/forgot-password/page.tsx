"use client";

import IconButton from "@/app/_libs/components/IconButton";
import Input from "@/app/_libs/components/Input";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { axiosPublic } from "@/app/_libs/utils/axios";
import { useToast } from "@/app/_libs/hooks/useToast";
import { MdEmail } from "react-icons/md";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { api } from "@/app/_libs/utils/routes/api";
import { page } from "@/app/_libs/utils/routes/pages";

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const { toastSuccess, toastError } = useToast();

    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        reset,
        setError,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api.forgot_password, {...getValues()});
          toastSuccess(response.data.message);            
          reset({
            email: "",
          });
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.email) {
            setError("email", {
              type: "server",
              message: error?.response?.data?.errors?.email[0],
            });
          }
        } finally {
          setLoading(false);
        }
    };

    return <>
        <div className="rounded-md bg-white w-full px-5 py-8 border border-gray-300">
            <h4 className="text-center text-2xl font-bold mb-2">Worried?</h4>
            <p className="text-center text-gray-500 text-md mb-5">No Problem! Just Follow The Simple Way</p>
            <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                <Input Icon={MdEmail} type="email" placeholder="Your Email" register={register} errors={errors} name="email" />
                <IconButton Icon={TbPasswordMobilePhone} text="SEND RESET LINK" loading={loading} />
            </form>
        </div>
        <div className="rounded-md bg-white w-full px-5 py-4 border border-gray-300 mt-3">
            <div className="text-center">
                <Link href={page.auth.login} className="text-center text-gray-500 text-md">Remember your passowrd? <span className=" font-bold text-black">Login</span></Link>
            </div>
        </div>
    </> 
}