import { CartType } from "@/app/_libs/utils/types";
import Image from "next/image";
import Link from "next/link";
import { page } from "../../utils/routes/pages";
import ProductCardCartBtn from "@/app/products/_components/Products/ProductCardCartBtn";
import { useCart } from "../../hooks/useCart";

type CartCardPropsType = CartType;

export default function CartCard({product, product_price, amount}:CartCardPropsType) {
    const {quantity, cartItemLoading, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id: product.id, product_prices: product.product_prices, min_cart_quantity: product.min_cart_quantity, cart_quantity_interval: product.cart_quantity_interval});

    return <div className="w-full px-3 py-3 flex justify-between items-start gap-2 border-b border-solid border-gray-200 last:border-none">
        <Image src={product.image} alt={product.name} title={product.name} width={100} height={100} />
        <div className=" h-100 flex-1 flex flex-col justify-between h-100">
            <div className="w-full h-auto mb-2 text-left">
                <Link href={`${page.products}/${product.slug}`} className=" w-full font-semibold">{product.name}</Link>
                <p className=" w-full text-sm">Unit Price - ₹{product_price.discount_in_price}/{product.cart_quantity_specification}</p>
            </div>
            <div className=" w-full h-auto flex justify-between items-center">
                <div className=" w-1/2 md:w-3/4 lg:w-2/3">
                    <ProductCardCartBtn quantity={quantity} min_cart_quantity={product.min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
                </div>
                <p className=" w-auto font-semibold">&#8377;{amount}</p>
            </div>
        </div>
    </div>
}