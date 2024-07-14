import { page } from "@/app/_libs/utils/routes/pages";
import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
    name: string;
    slug: string;
    id: string | number;
    image: string;
}
export default function CategoryCard({name, image, slug, id}:CategoryCardProps) {
    return <Link href={`${page.products}?category=${slug}&category_id=${id}`} className=" w-full text-center">
        <Image src={image} width={200} height={200} alt={name} title={name} className="mx-auto" />
        <h3 className="mt-3 text-base md:text-lg text-[#8c6d52] font-semibold">{name}</h3>
    </Link>
}