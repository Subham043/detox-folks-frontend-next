"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAboutQueryOptions } from "../../_libs/utils/query/getAboutQuery";

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
                    <div className=" w-full order-2 lg:w-[48%] lg:order-1">
                        <h1 className=" text-2xl md:text-4xl text-[#8c6d52] font-semibold mb-2 md:mb-5">{data?.heading}</h1>
                        <div dangerouslySetInnerHTML={{__html:data ? data.description : ''}} />
                    </div>
                    <div className=" w-full order-1 mb-3 lg:w-[48%] lg:order-2 lg:mb-0">
                        <Image className="rounded-lg" priority src={data ? data.image : ''} width={586} height={439} alt="Detoxfolks" title="Detoxfolks" />
                    </div>
                </div>
            </div>
        </div>
}