import { CartType } from "@/app/_libs/utils/types";
import Image from "next/image";
import Link from "next/link";
import { page } from "../../utils/routes/pages";
import ProductCardCartBtn2 from "@/app/products/_components/Products/ProductCardCartBtn2";
import { useCart } from "../../hooks/useCart";

type CartCardPropsType = CartType;

export default function CartCard({product, product_price, amount}:CartCardPropsType) {
    const {quantity, color, cartItemLoading, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id: product.id, product_prices: product.product_prices, min_cart_quantity: product.min_cart_quantity, cart_quantity_interval: product.cart_quantity_interval});

    return <div className="w-full px-3 py-3 border-b border-solid border-gray-200 last:border-none">
        <div className="w-full flex flex-wrap justify-between items-center gap-2">
            <Image src={product.image} alt={product.name} title={product.name} width={90} height={90} />
            <div className=" h-100 flex-1 flex flex-col justify-between h-100">
                <div className="w-full h-auto mb-2 text-left">
                    <Link href={`${page.products}/${product.slug}`} className=" w-full font-semibold text-[#8c6d52]">{product.name}</Link>
                    <p className=" w-full text-sm">Unit Price - ₹{product_price.discount_in_price}/{product.cart_quantity_specification}</p>
                </div>
            </div>
        </div>
        <div className=" w-full h-auto flex flex-wrap justify-between items-center mt-2">
            <div className=" w-2/3 md:w-3/4 lg:w-2/3">
                <ProductCardCartBtn2 quantity={quantity} color={color} min_cart_quantity={product.min_cart_quantity} cart_quantity_interval={product.cart_quantity_interval} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} colors={product.product_colors ?? []} product_id={product.id} product_name={product.name} />
            </div>
            <p className=" w-auto font-semibold">&#8377;{amount.toFixed(2)}</p>
        </div>
    </div>
}