"use client";

import IconButton from "@/app/_libs/components/IconButton";
import Input from "@/app/_libs/components/Input";
import Link from "next/link";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/app/_libs/hooks/useToast";
import { axiosPublic } from "@/app/_libs/utils/axios";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { GrLogin } from "react-icons/gr";
import { api } from "@/app/_libs/utils/routes/api";
import { page } from "@/app/_libs/utils/routes/pages";
import { TbPasswordMobilePhone } from "react-icons/tb";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    password_confirmation: yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export default function ResetPassword({ params }: { params: { user_token: string } }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
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
          const response = await axiosPublic.post(api.reset_password+`/${params.user_token}`, {...getValues()}); 
          toastSuccess(response.data.message); 
            reset({
                email: "",
                password: "",
                password_confirmation: "",
            });
            router.push(page.auth.login);
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
          if (error?.response?.data?.errors?.password) {
            setError("password", {
              type: "server",
              message: error?.response?.data?.errors?.password[0],
            });
          }
          if (error?.response?.data?.errors?.password_confirmation) {
            setError("password_confirmation", {
              type: "server",
              message: error?.response?.data?.errors?.password_confirmation[0],
            });
          }
        } finally {
          setLoading(false);
        }
    };

    return <>
        <div className="rounded-md bg-white w-full px-5 py-8 border border-gray-300">
            <h4 className="text-center text-2xl font-bold mb-2">Reset Now!</h4>
            <p className="text-center text-gray-500 text-md mb-5">Follow the steps and reset your password</p>
            <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                <Input Icon={MdEmail} type="email" placeholder="Email" register={register} errors={errors} name="email" />
                <Input Icon={RiLockPasswordFill} type="password" placeholder="Password" register={register} errors={errors} name="password" />
                <Input Icon={RiLockPasswordFill} type="password" placeholder="Confirm Password" register={register} errors={errors} name="password_confirmation" />
                <IconButton Icon={TbPasswordMobilePhone} text="RESET" loading={loading} />
            </form>
        </div>
        <div className="rounded-md bg-white w-full px-5 py-4 border border-gray-300 mt-3">
            <div className="text-center">
                <Link href={page.auth.login} className="text-center text-gray-500 text-md">Remeber your password? <span className=" font-bold text-black">Login</span></Link>
            </div>
        </div>
    </> 
}