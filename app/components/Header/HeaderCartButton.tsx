"use client";

import { FaShoppingBasket } from "react-icons/fa";
import Drawer from "../Drawer";
import { useState } from "react";
import CartSidebar from "../CartSidebar";

export default function HeaderCartButton() {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button className="flex flex-wrap items-center gap-3" onClick={()=>setIsOpen(true)}>
            <div className=" bg-gray-100 rounded-full relative flex justify-center items-center w-11 h-11">
                <FaShoppingBasket />
                <span className="w-5 h-5 absolute bg-black text-white rounded-full -top-1.5 -right-0.5 text-sm flex justify-center items-center">3</span>
            </div>
            <div className=" text-left">
                <p className=" text-xs">TOTAL PRICE</p>
                <p className=" text-md font-semibold">&#8377;100.00</p>
            </div>
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <CartSidebar />
        </Drawer>
    </>
}