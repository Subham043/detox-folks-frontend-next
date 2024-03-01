import { page } from "@/app/_libs/utils/routes/page";
import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
    name: string;
    slug: string;
    image: string;
}
export default function SubCategoryCard({name, image, slug, category_slug}:CategoryCardProps & {category_slug: string}) {
    return <Link href={`${page.products}?category=${category_slug}&sub_category=${slug}`} className=" w-full px-2 py-2 text-center">
        <Image src={image} width={200} height={200} alt="" className="mx-auto" />
        <h3 className="mt-3 text-xl text-gray-700 font-semibold">{name}</h3>
    </Link>
}