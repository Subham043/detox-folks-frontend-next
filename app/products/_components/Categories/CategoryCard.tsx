import { page } from "@/app/_libs/utils/routes/pages";
import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
    name: string;
    slug: string;
    id: number|string;
    image: string;
}
export default function CategoryCard({name, image, id, slug}:CategoryCardProps) {
    return <Link href={page.products + `?category=${slug}&category_id=${id}`} className=" w-full flex items-center px-2 py-2 text-left gap-2">
        <Image src={image} width={50} height={50} alt={name} title={name} className="mx-auto" />
        <h3 className="flex-1 font-semibold text-base">{name}</h3>
    </Link>
}