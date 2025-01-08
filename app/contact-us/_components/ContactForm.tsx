"use client";

import { FaPhoneAlt, FaUser } from "react-icons/fa";
import Input from "../../_libs/components/Input";
import IconButton from "../../_libs/components/IconButton";
import Textarea from "../../_libs/components/Textarea";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { axiosPublic } from "../../_libs/utils/axios";
import { useToast } from "../../_libs/hooks/useToast";
import { MdEmail, MdOutlineMessage } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { api } from "@/app/_libs/utils/routes/api";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
  })
  .required();

export default function ContactForm(){
    const { toastSuccess, toastError } = useToast();
    const [loading, setLoading] = useState(false);
    const pathname = usePathname()

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
          const response = await axiosPublic.post(api.enquiry, {...getValues(), page_url: 'https://parcelcounter.in'+pathname});
          toastSuccess(response.data.message);            
          reset({
            name: "",
            phone: "",
            email: "",
            message: "",
          });
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
          if (error?.response?.data?.errors?.message) {
            setError("message", {
              type: "server",
              message: error?.response?.data?.errors?.message[0],
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
        <Textarea Icon={MdOutlineMessage} placeholder="Your Message" register={register} errors={errors} name="message" />
        <IconButton Icon={IoSend} text="SEND MESSAGE" loading={loading} />
    </form>
}