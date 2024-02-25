"use client";

import { getFeatureQueryOptions } from "@/app/utils/data-query/getFeatureQuery";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function PolicyFooter() {
    const {
        data
    } = useQuery({
        queryKey: getFeatureQueryOptions.getFeatureQueryKey,
        queryFn: getFeatureQueryOptions.getFeatureQueryFn,
    })

    return <div className="w-full bg-zinc-300">
        <div className="container mx-auto">
            <div className=" py-10 flex justify-between items-start gap-3">
                {
                    (data ? data.feature : []).map((item, i) => <div className=" w-1/4" key={i}>
                        <div className=" flex flex-wrap items-center gap-4 mb-2">
                            <Image
                                src={item.image}
                                alt="Vercel Logo"
                                className="w-12 h-12 rounded-full object-contain bg-white border-2 border-double border-black"
                                width={45}
                                height={45}
                            />
                            <h4 className=" font-semibold text-lg">{item.title}</h4>
                        </div>
                        <p>
                            {item.description}
                        </p>
                    </div>)
                }
            </div>
        </div>
    </div>
}