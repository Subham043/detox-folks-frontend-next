import Image from "next/image";
import ProductCardCartBtn from "./ProductCardCartBtn";
import { useCart } from "../hooks/useCart";
import { ProductType } from "../utils/types";
import ProductCardPrice from "./ProductCardPrice";

export default function ProductCard({ id, name, image, slug, product_prices, min_cart_quantity, cart_quantity_interval, cart_quantity_specification }:ProductType) {
    const {quantity, cartLoading, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id, product_prices, min_cart_quantity, cart_quantity_interval});
    return <div className=" w-full px-3 text-center mb-3">
        <div className=" bg-white px-3 py-4 rounded-sm">
            <Image src={image} width={200} height={200} alt="" className="mx-auto mb-2" />
            <h3 className=" text-gray-700 font-semibold">{name}</h3>
            <ProductCardPrice product_prices={product_prices} cart_product_item={cart_product_item} cart_quantity_specification={cart_quantity_specification} />
            <ProductCardCartBtn quantity={quantity} min_cart_quantity={min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
        </div>
    </div>
}