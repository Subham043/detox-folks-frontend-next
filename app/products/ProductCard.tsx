import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { IoInformationCircleSharp } from "react-icons/io5";
import ProductCardCartBtn from "./ProductCardCartBtn";
import { useCart } from "../hooks/useCart";
import { ProductType } from "../utils/types";

export default function ProductCard({ id, name, image, slug, product_prices, min_cart_quantity, cart_quantity_interval, cart_quantity_specification }:ProductType) {
    const {quantity, cartLoading, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id, product_prices, min_cart_quantity, cart_quantity_interval});
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
            <ProductCardCartBtn quantity={quantity} min_cart_quantity={min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
        </div>
    </div>
}