"use client";

import IconButton from "@/app/components/IconButton";
import Input from "@/app/components/Input";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/useToast";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrLogin } from "react-icons/gr";
import { page_routes } from "@/app/utils/page_routes";
import { signIn } from "next-auth/react"

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required();

export default function Login() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";
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
                email: getValues().email,
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
                    email: "",
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
        <div className="rounded-md bg-white w-full px-5 py-8 border border-gray-300">
            <h4 className="text-center text-2xl font-bold mb-2">Welcome!</h4>
            <p className="text-center text-gray-500 text-md mb-5">Use Your Credentials To Access</p>
            <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                <Input Icon={MdEmail} type="email" register={register} errors={errors} name="email" placeholder="Email" />
                <Input Icon={RiLockPasswordFill} type="password" register={register} errors={errors} name="password" placeholder="Password" />
                <IconButton Icon={GrLogin} text="LOGIN" loading={loading} />
            </form>
            <div className="text-center">
                <Link href={page_routes.auth.forgot_password} className="text-center text-gray-500 text-md">Forgot Your Password? <span className=" font-bold text-black">Reset Here</span></Link>
            </div>
        </div>
        <div className="rounded-md bg-white w-full px-5 py-4 border border-gray-300 mt-3">
            <div className="text-center">
                <Link href={page_routes.auth.register} className="text-center text-gray-500 text-md">Don&apos;t Have Any Account? <span className=" font-bold text-black">Register Here</span></Link>
            </div>
        </div>
    </> 
}