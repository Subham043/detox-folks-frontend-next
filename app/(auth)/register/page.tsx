"use client";

import IconButton from "@/app/_libs/components/IconButton";
import Input from "@/app/_libs/components/Input";
import Link from "next/link";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_libs/hooks/useToast";
import { axiosPublic } from "@/app/_libs/utils/axios";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { GrLogin } from "react-icons/gr";
import { api } from "@/app/_libs/utils/routes/api";
import { page } from "@/app/_libs/utils/routes/pages";

const schema = yup
  .object({
    email: yup.string().email().notRequired(),
    name: yup.string().required(),
    password: yup.string().required(),
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    confirm_password: yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export default function Register() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const callbackUrl = page.auth.login;
    const { toastSuccess, toastError, toastInfo } = useToast();

    const {
        handleSubmit,
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
          await axiosPublic.post(api.register, {...getValues()});
          router.push(callbackUrl);
          reset({
            email: "",
            name: "",
            password: "",
            confirm_password: "",
            phone: "",
          });
          toastSuccess("Registration completed successfully.");                 
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
          if (error?.response?.data?.errors?.password) {
            setError("password", {
              type: "server",
              message: error?.response?.data?.errors?.password[0],
            });
          }
          if (error?.response?.data?.errors?.confirm_password) {
            setError("confirm_password", {
              type: "server",
              message: error?.response?.data?.errors?.confirm_password[0],
            });
          }
        } finally {
          setLoading(false);
        }
    };

    return <>
        <div className="rounded-md bg-white w-full px-5 py-8 border border-gray-300">
            <h4 className="text-center text-2xl font-bold mb-2">Join Now!</h4>
            <p className="text-center text-gray-500 text-md mb-5">Setup A New Account In A Minute</p>
            <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                <Input Icon={FaUser} placeholder="Name / Hotel Name" register={register} errors={errors} name="name" />
                <Input Icon={MdEmail} type="email" placeholder="Email (Optional)" register={register} errors={errors} name="email" />
                <Input Icon={FaPhoneAlt} placeholder="Phone" register={register} errors={errors} name="phone" />
                <Input Icon={RiLockPasswordFill} type="password" placeholder="Password" register={register} errors={errors} name="password" />
                <Input Icon={RiLockPasswordFill} type="password" placeholder="Confirm Password" register={register} errors={errors} name="confirm_password" />
                <IconButton Icon={GrLogin} text="REGISTER" loading={loading} />
            </form>
        </div>
        <div className="rounded-md bg-white w-full px-5 py-4 border border-gray-300 mt-3">
            <div className="text-center">
                <Link href={page.auth.login} className="text-center text-gray-500 text-md">Already Have An Account? <span className=" font-bold text-[#8c6d52]">Login</span></Link>
            </div>
        </div>
    </> 
}