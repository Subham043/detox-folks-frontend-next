import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import CartCard from "./CartCard";
import { useCartProvider } from "@/app/_libs/context/CartProvider";
import { page } from "../../utils/routes/pages";

export default function CartSidebar() {
    const {cart} = useCartProvider()
    
    return <>
        <div className="w-full h-full flex flex-col justify-between">
            <div className=" flex justify-center items-center gap-2 px-3 py-3 border-b border-solid border-gray-300">
                <FaShoppingBasket className="text-xl" />
                <h4 className=" text-lg font-semibold">
                    Total Item ({cart.cart.length})
                </h4>
            </div>
            <div className=" flex-1 max-h-[80vh] overflow-hidden overflow-y-auto">
                {
                    cart.cart.map((item, i) => <CartCard {...item} key={i} />)
                }
            </div>
            <div className=" text-center w-full px-3 py-3 border-t border-solid border-gray-300">
                <Link href={page.account.checkout} className=" flex justify-between items-center py-3 px-2 rounded-md w-full bg-black text-white gap-4">
                    <span className="flex-1 text-left border-r border-solid border-white">
                        Proceed To Checkout
                    </span>
                    <span className=" w-auto text-right">
                        &#8377;{cart.cart_subtotal}
                    </span>
                </Link>
            </div>
        </div>
    </>
}