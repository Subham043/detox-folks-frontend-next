import Image from "next/image";

type CategoryCardProps = {
    name: string;
    slug: string;
    image: string;
}
export default function ProductCard({name, image, slug}:CategoryCardProps) {
    return <div className=" w-full px-3 text-center mb-3">
        <div className=" bg-white px-3 py-4 rounded-sm">
            <Image src={image} width={200} height={200} alt="" className="mx-auto mb-2" />
            <h3 className="flex-1 text-gray-700 font-semibold">{name}</h3>
        </div>
    </div>
}