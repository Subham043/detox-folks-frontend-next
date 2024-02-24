"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useToast } from "@/app/hooks/useToast";
import { axiosPublic } from "@/app/utils/axios";
import { api_routes } from "@/app/utils/api_routes";
import Input from "@/app/components/Input";
import IconButton from "@/app/components/IconButton";
import { GrUpdate } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";

const schema = yup
  .object({
    old_password: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export default function PasswordForm(){
    const { toastSuccess, toastError } = useToast();
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
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.password_update, {...getValues()});
          toastSuccess(response.data.message);            
          reset({
            old_password: "",
            password: "",
            confirm_password: "",
          });
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.old_password) {
            setError("old_password", {
              type: "server",
              message: error?.response?.data?.errors?.old_password[0],
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

    return <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Input Icon={RiLockPasswordFill} type="password" placeholder="Current Password" register={register} errors={errors} name="old_password" />
        <Input Icon={RiLockPasswordFill} type="password" placeholder="New Password" register={register} errors={errors} name="password" />
        <Input Icon={RiLockPasswordFill} type="password" placeholder="Confirm Password" register={register} errors={errors} name="confirm_password" />
        <IconButton Icon={GrUpdate} text="UPDATE PASSWORD" loading={loading} />
    </form>
}