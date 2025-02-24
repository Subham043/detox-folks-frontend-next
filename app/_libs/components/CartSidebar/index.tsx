"use client";
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import CartCard from "./CartCard";
import { useCartProvider } from "@/app/_libs/context/CartProvider";
import { page } from "../../utils/routes/pages";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartSidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {cart} = useCartProvider();
    const pathname = usePathname();

    const closeSidebar = () => setIsOpen(false)

    useEffect(() => closeSidebar(), [pathname]);
    
    return <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <button className="flex flex-wrap items-center gap-3">
                    <div className=" bg-[#ede1d7] rounded-full relative flex justify-center items-center w-11 h-11">
                        <FaShoppingBasket className=" text-[#8c6d52]" />
                        <span className="w-5 h-5 absolute bg-[#8c6d52] text-white rounded-full -top-1.5 -right-0.5 text-sm flex justify-center items-center">{cart.cart.length}</span>
                    </div>
                    <div className=" text-left hidden lg:block">
                        <p className=" text-xs">TOTAL PRICE</p>
                        <p className=" text-md font-semibold">&#8377;{cart.cart_subtotal.toFixed(2)}</p>
                    </div>
                </button>
            </SheetTrigger>
            <SheetContent className="p-0" side='right'>
                <SheetHeader className="h-full flex-1">
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className="w-full flex justify-center items-center gap-2 px-3 py-3 border-b border-solid border-gray-300">
                            <FaShoppingBasket className="text-xl text-[#8c6d52]" />
                            <h4 className=" text-base md:text-lg font-semibold text-[#8c6d52]">
                                Total Item ({cart.cart.length})
                            </h4>
                        </div>
                        <div className=" flex-1 overflow-hidden overflow-y-auto">
                            {
                                cart.cart.length>0 ? cart.cart.map((item, i) => <CartCard {...item} key={i} />):
                                <div className=" text-center">
                                    <p>No items are there in cart. Kindly add one!</p>
                                </div>
                            }
                        </div>
                        <div className=" text-center w-full px-3 py-3 border-t border-solid border-gray-300">
                            <Link href={page.account.checkout} className=" flex justify-between items-center py-3 px-2 rounded-md w-full bg-[#8c6d52] text-white gap-4 transition-all hover:bg-gray-600">
                                <span className="flex-1 text-left border-r border-solid border-white">
                                    Checkout
                                </span>
                                <span className=" w-auto text-right">
                                    &#8377;{cart.cart_subtotal.toFixed(2)}
                                </span>
                            </Link>
                        </div>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </>
}