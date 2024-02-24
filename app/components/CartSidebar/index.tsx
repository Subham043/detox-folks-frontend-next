import { page_routes } from "@/app/utils/page_routes";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import CartCard from "./CartCard";

export default function CartSidebar() {
    return <>
        <div className="w-full h-full flex flex-col justify-between">
            <div className=" flex justify-center items-center gap-2 px-3 py-3 border-b border-solid border-gray-300">
                <FaShoppingBasket className="text-xl" />
                <h4 className=" text-lg font-semibold">
                    Total Item (2)
                </h4>
            </div>
            <div className=" flex-1 max-h-[80vh] overflow-hidden overflow-y-auto">
                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />
            </div>
            <div className=" text-center w-full px-3 py-3 border-t border-solid border-gray-300">
                <Link href={page_routes.home} className=" flex justify-between items-center py-3 px-2 rounded-md w-full bg-black text-white gap-4">
                    <span className="flex-1 text-left border-r border-solid border-white">
                        Proceed To Checkout
                    </span>
                    <span className=" w-auto text-right">
                        &#8377;100.00
                    </span>
                </Link>
            </div>
        </div>
    </>
}