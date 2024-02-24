"use client";

import { FaPhoneAlt, FaUser } from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useToast } from "@/app/hooks/useToast";
import { axiosPublic } from "@/app/utils/axios";
import { api_routes } from "@/app/utils/api_routes";
import Input from "@/app/components/Input";
import IconButton from "@/app/components/IconButton";
import { GrUpdate } from "react-icons/gr";
import { useSession } from "next-auth/react";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
  })
  .required();

export default function ProfileForm(){
    const { toastSuccess, toastError } = useToast();
    const [loading, setLoading] = useState(false);
    const { data: session, update: sessionUpdate } = useSession();

    const {
        handleSubmit,
        register,
        getValues,
        setError,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
        values: {
            name: session ? session.user.name : '',
            phone: session ? session.user.phone : '',
            email: session ? session.user.email : ''
        }
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.profile_update, {...getValues()});
          toastSuccess(response.data.message);            
          sessionUpdate({
            profile: {
              ...getValues()
            }
          })
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
        } finally {
          setLoading(false);
        }
      };

    return <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Input Icon={FaUser} placeholder="Your Name" register={register} errors={errors} name="name"  />
        <Input Icon={MdEmail} type="email" placeholder="Your Email" register={register} errors={errors} name="email" />
        <Input Icon={FaPhoneAlt} placeholder="Your Phone" register={register} errors={errors} name="phone" />
        <IconButton Icon={GrUpdate} text="UPDATE PROFILE" loading={loading} />
    </form>
}