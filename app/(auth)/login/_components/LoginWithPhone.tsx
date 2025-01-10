"use client";

import IconButton from "@/app/_libs/components/IconButton";
import Input from "@/app/_libs/components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/app/_libs/hooks/useToast";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrLogin } from "react-icons/gr";
import { signIn } from "next-auth/react"
import { page } from "@/app/_libs/utils/routes/pages";
import { FaPhoneAlt } from "react-icons/fa";
import { axiosPublic } from "@/app/_libs/utils/axios";
import { api } from "@/app/_libs/utils/routes/api";

type CredentialRequestOptions = {
  otp: OTPOptions
  signal: AbortSignal
}

type OTPOptions = {
  transport: string[]
}

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
    const [otpReading, setOtpReading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || page.account.profile;
    const { toastError, toastSuccess } = useToast();

    const {
        handleSubmit,
        register,
        getValues,
        reset,
        setValue,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function isSupported() {
        return 'OTPCredential' in window && typeof AbortController !== "undefined" && otpReading;
    }

    useEffect(() => {
    if (isSupported()) {
      const ac = new AbortController()
      const o: CredentialRequestOptions = {
        otp: { transport: ['sms'] },
        signal: ac.signal,
      }
      navigator.credentials
        .get(o)
        .then((otp: any) => {
          if (otp) {
            setValue('otp', otp.code)
          }
          setOtpReading(false)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpReading])

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
          await axiosPublic.post(api.login_phone_otp_web, {phone: getValues().phone});
          toastSuccess("Otp sent successfully.");
          setOtpReading(true);               
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