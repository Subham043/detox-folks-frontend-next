import { IconType } from "react-icons";
import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type InputProps = {
    Icon: IconType;
    type?: HTMLInputTypeAttribute;
    placeholder: string;
    name: string,
    errors : FieldErrors<any>,
    register: UseFormRegister<any>,
};

export default function Input({Icon, type="text", placeholder, errors, name, register}:InputProps) {
    return <div className=" relative w-full mb-2">
        <input type={type} placeholder={placeholder} {...register(name)} className=" h-[45px] rounded-sm border border-gray-300 w-full text-[#555] bg-[#f5f5f5] pl-[45px] pr-[20px] pb-[2px]" />
        <div className="absolute top-0 h-[45px] w-[45px] text-center flex justify-center items-center">
            <Icon className=" text-[#555] text-lg" />
        </div>
        <ErrorMessage
            errors={errors}
            name={name}
            as={<div style={{ color: 'red' }} />}
        />
    </div>
}