import { page } from "@/app/_libs/utils/routes/pages";
import Image from "next/image";
import Link from "next/link";

type PopularBlogCardProps = {
    name: string;
    slug: string;
    image: string;
    description_unfiltered: string;
}
export default function PopularBlogCard({name, image, slug, description_unfiltered}:PopularBlogCardProps) {
    return <Link href={page.blogs + `/${slug}`} className=" w-full flex items-center px-2 py-2 text-left gap-2">
        <Image src={image} width={90} height={90} alt="" className="mx-auto" />
        <div className="flex-1">
            <h3 className="text-gray-700 font-semibold text-base">{name}</h3>
            <p className=" text-sm text-neutral-500 mb-2 line-clamp-2">{description_unfiltered}</p>
        </div>
    </Link>
}