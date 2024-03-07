"use client";

import { FaShoppingBasket } from "react-icons/fa";
import Drawer from "../Drawer";
import { useState } from "react";
import CartSidebar from "../CartSidebar";
import { useCartProvider } from "@/app/_libs/context/CartProvider";

export default function HeaderCartButton() {
    const {cart} = useCartProvider()
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button className="flex flex-wrap items-center gap-3" onClick={()=>setIsOpen(true)}>
            <div className=" bg-gray-100 rounded-full relative flex justify-center items-center w-11 h-11">
                <FaShoppingBasket />
                <span className="w-5 h-5 absolute bg-black text-white rounded-full -top-1.5 -right-0.5 text-sm flex justify-center items-center">{cart.cart.length}</span>
            </div>
            <div className=" text-left hidden lg:block">
                <p className=" text-xs">TOTAL PRICE</p>
                <p className=" text-md font-semibold">&#8377;{cart.cart_subtotal}</p>
            </div>
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <CartSidebar />
        </Drawer>
    </>
}