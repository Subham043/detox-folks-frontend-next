import Image from "next/image";

type CategoryCardProps = {
    name: string;
    slug: string;
    image: string;
}
export default function CategoryCard({name, image, slug}:CategoryCardProps) {
    return <div className=" w-full px-2 py-2 text-center">
        <Image src={image} width={200} height={200} alt="" className="mx-auto" />
        <h3 className="mt-3 text-xl text-gray-700 font-semibold">{name}</h3>
    </div>
}