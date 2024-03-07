import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import CartCard from "./CartCard";
import { useCartProvider } from "@/app/_libs/context/CartProvider";
import { page } from "../../utils/routes/pages";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";

export default function CartSidebar() {
    const {cart} = useCartProvider()
    
    return <>
        <Sheet>
            <SheetTrigger asChild>
                <button className="flex flex-wrap items-center gap-3">
                    <div className=" bg-gray-100 rounded-full relative flex justify-center items-center w-11 h-11">
                        <FaShoppingBasket />
                        <span className="w-5 h-5 absolute bg-black text-white rounded-full -top-1.5 -right-0.5 text-sm flex justify-center items-center">{cart.cart.length}</span>
                    </div>
                    <div className=" text-left hidden lg:block">
                        <p className=" text-xs">TOTAL PRICE</p>
                        <p className=" text-md font-semibold">&#8377;{cart.cart_subtotal}</p>
                    </div>
                </button>
            </SheetTrigger>
            <SheetContent className="p-0" side='right'>
                <SheetHeader className="h-full flex-1">
                    <div className="w-full flex justify-center items-center gap-2 px-3 py-3 border-b border-solid border-gray-300">
                        <FaShoppingBasket className="text-xl" />
                        <h4 className=" text-lg font-semibold">
                            Total Item ({cart.cart.length})
                        </h4>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className=" flex-1 max-h-[80vh] overflow-hidden overflow-y-auto">
                            {
                                cart.cart.length>0 ? cart.cart.map((item, i) => <CartCard {...item} key={i} />):
                                <div className=" text-center">
                                    <p>No items are there in cart. Kindly add one!</p>
                                </div>
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
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </>
}