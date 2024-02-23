import { page_routes } from "@/app/utils/page_routes";
import { GlobalSearchType } from "@/app/utils/types";
import Image from "next/image";
import Link from "next/link";

type SearchCardProps = GlobalSearchType;

export default function SearchCard({slug, name, search_type, image}:SearchCardProps){
    return <Link href={page_routes.home} className=" flex items-center w-full mb-3 bg-white border-[0.1px] border-gray-400 rounded-md">
        <Image src={image} alt="" height={100} width={100} />
        <div className=" flex-1 px-2">
            <h3 className=" text-lg text-black">{name}</h3>
            <p className=" text-sm text-gray-500">{search_type}</p>
        </div>
    </Link>
}