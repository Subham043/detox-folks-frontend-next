import Image from "next/image";
import ProductCardCartBtn2 from "./ProductCardCartBtn2";
import { useCart } from "../../../_libs/hooks/useCart";
import { ProductType } from "../../../_libs/utils/types";
import ProductCardPrice from "./ProductCardPrice";
import Link from "next/link";
import { page } from "@/app/_libs/utils/routes/pages";

export default function ProductCard({ id, name, image, slug, product_prices, product_colors, min_cart_quantity, cart_quantity_interval, cart_quantity_specification, taxes }:ProductType) {
    const {quantity, color, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id, product_prices, min_cart_quantity, cart_quantity_interval});
    return <div className=" w-full px-1 text-center mb-3">
        <div className=" bg-white px-3 py-4 rounded-sm transition-all hover:scale-110 hover:shadow-xl">
            <Link href={`${page.products}/${slug}`}>
                <Image src={image} width={200} height={200} alt={name} title={name} className="mx-auto mb-2" />
                <h3 className=" text-[#8c6d52] font-semibold">{name}</h3>
            </Link>
            <ProductCardPrice taxes={taxes} product_prices={product_prices} cart_product_item={cart_product_item} cart_quantity_specification={cart_quantity_specification} />
            <div className="mt-2">
                <ProductCardCartBtn2 quantity={quantity} color={color} min_cart_quantity={min_cart_quantity} cart_quantity_interval={cart_quantity_interval} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} colors={product_colors ?? []} product_id={id} product_name={name} />
            </div>
        </div>
    </div>
}