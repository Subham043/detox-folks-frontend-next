"use client";

import IconButton from "@/app/_libs/components/IconButton";
import Input from "@/app/_libs/components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/app/_libs/hooks/useToast";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrLogin } from "react-icons/gr";
import { signIn } from "next-auth/react"
import { page } from "@/app/_libs/utils/routes/pages";
import { FaPhoneAlt } from "react-icons/fa";

const schema = yup
    .object({
        phone: yup
        .string()
        .required()
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
        password: yup.string().required(),
    })
    .required();

export default function LoginWithPhonePassword() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || page.account.profile;
    const { toastError } = useToast();

    const {
        handleSubmit,
        register,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
            const res = await signIn('credentials', {
                redirect: false,
                type: "PhonePassword",
                phone: getValues().phone,
                password: getValues().password,
            });
            if (!res?.error) {
                // fetchCart()
                // if(showLogin){
                //     hideLogin();
                // }else{
                    router.push(callbackUrl);
                // }
                reset({
                    phone: "",
                    password: "",
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

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input Icon={FaPhoneAlt} type="number" register={register} errors={errors} name="phone" placeholder="Phone Number" />
            <Input Icon={RiLockPasswordFill} type="password" register={register} errors={errors} name="password" placeholder="Password" />
            <IconButton Icon={GrLogin} text="LOGIN" loading={loading} />
        </form>
    </> 
}