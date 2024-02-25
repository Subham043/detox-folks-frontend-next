"use client";

import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "@/app/components/Breadcrumb";
import { getLegalQueryOptions } from "@/app/utils/data-query/getLegalQuery";

type LegalSectionProps = { slug: string };

export default function LegalSection({slug}:LegalSectionProps) {
    const {
        data
    } = useQuery({
        queryKey: getLegalQueryOptions.getLegalQueryKey(slug),
        queryFn: () => getLegalQueryOptions.getLegalQueryFn(slug),
    })
    
    return <>
        <Breadcrumb name={data ? data.heading : ''} />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-center">
                    <div className=" w-full">
                        <h1 className=" text-4xl text-black font-semibold mb-5">{data?.heading}</h1>
                        <div dangerouslySetInnerHTML={{__html:data ? data.description : ''}} />
                    </div>
                </div>
            </div>
        </div>
    </>
}