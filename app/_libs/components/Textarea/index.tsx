import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

type TextareaProps = {
    Icon: IconType;
    placeholder: string;
    name: string,
    errors : FieldErrors<any>,
    register: UseFormRegister<any>,
};

export default function Textarea({Icon, placeholder, errors, register, name}:TextareaProps) {
    return <div className=" relative w-full mb-2">
        <textarea placeholder={placeholder} {...register(name)} className=" h-[80px] rounded-sm border border-gray-300 w-full text-[#555] bg-[#f5f5f5] pl-[45px] pr-[20px] py-[8px]"></textarea>
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