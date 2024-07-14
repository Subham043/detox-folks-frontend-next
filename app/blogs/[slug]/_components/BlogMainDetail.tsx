import Image from "next/image";
import { BlogType } from "@/app/_libs/utils/types";
import { IoCalendar } from "react-icons/io5";

type BlogMainDetailProps = {data: BlogType | undefined};

export default function BlogMainDetail({data}:BlogMainDetailProps) {
    
    return <div className="w-full overflow-hidden bg-white rounded-md">
        <Image src={data ? data.image : ''} alt={data ? data.name : ''} width={700} height={300} className="w-full rounded-md mb-3" />
        <div className="w-full px-3 py-3">
            <div className=" flex justify-between items-center gap-2 mb-3">
                <h1 className=" w-auto text-4xl text-[#8c6d52] font-semibold">{data?.heading}</h1>
                <div className="flex-1 flex justify-end items-center gap-2">
                    <IoCalendar className=" text-lg" />
                    <p className=" text-base text-neutral-500 w-auto">{data?.created_at}</p>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html:data ? data.description : ''}} />
        </div>
    </div>
}