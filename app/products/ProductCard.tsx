import Image from "next/image";
import { FaBasketShopping } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { IoInformationCircleSharp } from "react-icons/io5";

type CategoryCardProps = {
    name: string;
    slug: string;
    image: string;
}
export default function ProductCard({name, image, slug}:CategoryCardProps) {
    return <div className=" w-full px-3 text-center mb-3">
        <div className=" bg-white px-3 py-4 rounded-sm">
            <Image src={image} width={200} height={200} alt="" className="mx-auto mb-2" />
            <h3 className=" text-gray-700 font-semibold">{name}</h3>
            <Popover>
                <PopoverTrigger asChild>
                    <button className=" text-neutral-600 font-medium w-full flex justify-center items-center gap-2"><span>₹2.52 / pieces</span> <IoInformationCircleSharp /></button>
                </PopoverTrigger>
                <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>
            <button className=" mt-2 mx-auto w-full bg-black text-sm text-white text-center px-3 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><FaBasketShopping /> <span>ADD</span></button>
        </div>
    </div>
}