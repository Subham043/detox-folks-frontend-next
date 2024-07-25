"use client";

import IconButton from "@/app/_libs/components/IconButton";
import Input from "@/app/_libs/components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/app/_libs/hooks/useToast";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrLogin } from "react-icons/gr";
import { signIn } from "next-auth/react"
import { page } from "@/app/_libs/utils/routes/pages";
import { FaPhoneAlt } from "react-icons/fa";
import { axiosPublic } from "@/app/_libs/utils/axios";
import { api } from "@/app/_libs/utils/routes/api";

const schema = yup
    .object({
        phone: yup
        .string()
        .required()
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
        otp: yup
        .string()
        .required()
        .min(4, "Must be exactly 4 digits")
        .max(4, "Must be exactly 4 digits"),
    })
    .required();

export default function LoginWithPhone() {
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || page.account.profile;
    const { toastError, toastSuccess } = useToast();

    const {
        handleSubmit,
        register,
        getValues,
        reset,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
            const res = await signIn('credentials', {
                redirect: false,
                type: "Phone",
                phone: getValues().phone,
                otp: getValues().otp,
            });
            if (!res?.error) {
                router.push(callbackUrl);
                reset({
                    phone: "",
                    otp: "",
                });
            } else {
                toastError("Invalid Credentials");
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onSendOtp = async () => {
        if(getValues().phone.length < 1){
            setError("phone", {
              type: "server",
              message: "Phone number is required",
            });
            return ;
        }
        if(getValues().phone.length < 10 || getValues().phone.length > 10){
            setError("phone", {
              type: "server",
              message: "Must be exactly 10 digits",
            });
            return ;
        }
        setError("phone", {
            type: "server",
            message: undefined,
        });
        setOtpLoading(true);
        try {
          await axiosPublic.post(api.login_phone_otp, {phone: getValues().phone});
          toastSuccess("Otp sent successfully.");                 
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.phone) {
            setError("phone", {
              type: "server",
              message: error?.response?.data?.errors?.phone[0],
            });
          }
        } finally {
          setOtpLoading(false);
        }
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input Icon={FaPhoneAlt} type="number" register={register} errors={errors} name="phone" placeholder="Phone Number" />
            <div className="w-full flex justify-end mb-1">
                <button type="button" onClick={onSendOtp} disabled={otpLoading}>{otpLoading ? 'Sending OTP' : 'Send OTP'}</button>
            </div>
            <Input Icon={RiLockPasswordFill} type="number" register={register} errors={errors} name="otp" placeholder="OTP" />
            <IconButton Icon={GrLogin} text="LOGIN" loading={loading} />
        </form>
    </> 
}