import { CartType } from "@/app/_libs/utils/types";
import Image from "next/image";
import Link from "next/link";
import { page } from "../../utils/routes/pages";

type CartCardPropsType = CartType;

export default function CartCard({product, product_price, amount}:CartCardPropsType) {
    return <div className="w-full px-3 py-3 flex justify-between items-start gap-2 border-b border-solid border-gray-200 last:border-none">
        <Image src={product.image} alt="" width={100} height={100} />
        <div className=" h-100 flex-1 flex flex-col justify-between h-100">
            <div className="w-full h-auto mb-2">
                <Link href={page.home} className=" w-full font-semibold">{product.name}</Link>
                <p className=" w-full text-sm">Unit Price - ₹{product_price.discount_in_price}/{product.cart_quantity_specification}</p>
            </div>
            <div className=" w-full h-auto flex justify-between items-center">
                <div className=" flex flex-wrap justify-start items-center gap-1">
                    <button className=" inline-block bg-gray-200 px-2 py-0.5 text-lg font-semibold rounded-sm">-</button>
                    <input type="text" defaultValue={1} className=" w-16 max-w-16 inline-block bg-gray-200 px-2 py-0.5 text-lg font-semibold rounded-sm flex-1 text-center" />
                    <button className=" inline-block bg-gray-200 px-2 py-0.5 text-lg font-semibold rounded-sm">+</button>
                </div>
                <p className=" w-auto font-semibold">&#8377;{amount}</p>
            </div>
        </div>
    </div>
}