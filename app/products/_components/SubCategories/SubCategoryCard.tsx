import { page } from "@/app/_libs/utils/routes/pages";
import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
    name: string;
    id: number|string;
    slug: string;
    image: string;
}
export default function SubCategoryCard({name, image, id, slug, category_id, category_slug}:CategoryCardProps & {category_id: number, category_slug: string}) {
    return <Link href={`${page.products}?category=${category_slug}&category_id=${category_id}&sub_category=${slug}&sub_category_id=${id}`} className=" w-full px-2 py-2 text-center">
        <Image src={image} width={200} height={200} alt={name} title={name} className="mx-auto" />
        <h3 className="mt-3 text-base md:text-lg text-gray-700 font-semibold">{name}</h3>
    </Link>
}