import Image from "next/image";

type CategoryCardProps = {
    name: string;
    slug: string;
    image: string;
}
export default function CategoryCard({name, image, slug}:CategoryCardProps) {
    return <button className=" w-full flex items-center px-2 py-2 text-left gap-2">
        <Image src={image} width={50} height={50} alt="" className="mx-auto" />
        <h3 className="flex-1 text-gray-700 font-semibold text-base">{name}</h3>
    </button>
}