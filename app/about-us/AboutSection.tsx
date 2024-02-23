"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAboutQueryOptions } from "../utils/data-query/getAboutQuery";

export default function AboutSection() {
    const {
        data
    } = useQuery({
        queryKey: getAboutQueryOptions.getAboutQueryKey,
        queryFn: getAboutQueryOptions.getAboutQueryFn,
    })
    
    return <div className="w-full py-10">
        <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-center">
                <div className=" w-[48%]">
                    <h1 className=" text-4xl text-black font-semibold mb-5">{data?.heading}</h1>
                    <div dangerouslySetInnerHTML={{__html:data ? data.description : ''}} />
                </div>
                <div className=" w-[48%]">
                    <Image className="rounded-lg" priority src={data ? data.image : ''} width={586} height={439} alt="Detoxfolks" title="Detoxfolks" />
                </div>
            </div>
        </div>
    </div>
}