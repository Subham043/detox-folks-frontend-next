import { useCart } from "@/app/_libs/hooks/useCart";
import { CartType } from "@/app/_libs/utils/types";
import ProductCardCartBtn from "@/app/products/_components/Products/ProductCardCartBtn";
import Image from "next/image";

type CheckoutCartTableCardPropsType = CartType;

export default function CheckoutCartTableCard({product, product_price, amount}:CheckoutCartTableCardPropsType) {
    const {quantity, cartItemLoading, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id: product.id, product_prices: product.product_prices, min_cart_quantity: product.min_cart_quantity, cart_quantity_interval: product.cart_quantity_interval});
    return <>
        <tr className=" border-b dark:border-neutral-500">
            <td className="whitespace-nowrap border-r px-6 py-4">
                <div className="flex flex-wrap justify-start items-center gap-2">
                    <Image src={product.image} alt={product.name} title={product.name} width={70} height={70} />
                    <div className=" flex-1">
                        <h3 className=" text-base font-semibold">{product.name}</h3>
                        <p className=" text-neutral-500 font-semibold">₹{product_price.discount_in_price}/{product.cart_quantity_specification}</p>
                    </div>
                </div>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                <div className=" max-w-44 mx-auto">
                    <ProductCardCartBtn quantity={quantity} min_cart_quantity={product.min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
                </div>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                <h3 className=" text-base font-semibold">₹{amount}</h3>
            </td>
        </tr>
    </>
}