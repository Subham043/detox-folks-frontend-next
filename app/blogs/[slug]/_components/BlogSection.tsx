"use client";

import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import { getBlogQueryOptions } from "@/app/_libs/utils/query/getBlogQuery";
import BlogMainDetail from "./BlogMainDetail";
import PopularBlogs from "./PopularBlogs";

type BlogSectionProps = { slug: string };

export default function BlogSection({slug}:BlogSectionProps) {
    const {
        data
    } = useQuery({
        queryKey: getBlogQueryOptions.getBlogQueryKey(slug),
        queryFn: () => getBlogQueryOptions.getBlogQueryFn(slug),
    })
    
    return <>
        <Breadcrumb name={data ? data.heading : ''} />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start gap-3">
                    <div className=" flex-1">
                        <BlogMainDetail data={data} />
                    </div>
                    <div className="w-1/4 shrink-0 sticky top-8">
                        <PopularBlogs />
                    </div>
                </div>
            </div>
        </div>
    </>
}