import { page } from "@/app/_libs/utils/routes/pages";
import { GlobalSearchType } from "@/app/_libs/utils/types";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type SearchCardProps = GlobalSearchType & {
    setIsOpen: Dispatch<SetStateAction<boolean>>
};

export default function SearchCard({slug, name, search_type, image, id, setIsOpen}:SearchCardProps){
    const link = search_type==='PRODUCT' ? `${page.products}/${slug}` : (search_type==='CATEGORY' ? `${page.products}?category=${slug}&category_id=${id}` : `${page.products}?sub_category=${slug}&sub_category_id=${id}`)
    return <Link href={link} onClick={()=>setIsOpen(false)} className=" flex items-center w-full mb-3 bg-white border-[0.1px] border-gray-400 rounded-md">
        <Image src={image} alt="" height={100} width={100} />
        <div className=" flex-1 px-2">
            <h3 className=" text-lg text-black">{name}</h3>
            <p className=" text-sm text-gray-500">{search_type}</p>
        </div>
    </Link>
}