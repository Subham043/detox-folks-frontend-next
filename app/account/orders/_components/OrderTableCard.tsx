import { useMemo } from "react";
import { OrderType } from "@/app/_libs/utils/types"
import Link from "next/link";
import { page } from "@/app/_libs/utils/routes/pages";
import { FaLongArrowAltRight } from "react-icons/fa";

type OrderTableCardPropsType = OrderType
export default function OrderTableCard({id, products, total_price, created_at, statuses, payment}:OrderTableCardPropsType) {
    const productNames = useMemo(() => products.map(item => item.name).join(', '), [products]);
    return <>
        <tr className=" border-b dark:border-neutral-500 even:bg-white odd:bg-neutral-100">
            <td className="whitespace-nowrap border-r px-6 py-4">
                <Link href={`${page.account.orders}/${id}`} className=" text-base font-semibold">ORDER#{id}</Link>
            </td>
            <td className=" border-r px-6 py-4 text-left hidden lg:table-cell">
                <Link href={`${page.account.orders}/${id}`} className=" text-base font-semibold line-clamp-2">{productNames}</Link>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                <p className=" text-base font-semibold">₹{total_price}</p>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                <p className=" text-base font-semibold">{statuses[statuses.length-1].status}</p>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center hidden lg:table-cell">
                <p className=" text-base font-semibold">{payment.mode}</p>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center hidden lg:table-cell">
                <p className=" text-base font-semibold">{payment.status}</p>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                <p className=" text-base font-semibold">{created_at}</p>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                <Link href={`${page.account.orders}/${id}`} className=" mt-2 mx-auto w-full bg-black text-sm text-white text-center px-3 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><span>VIEW</span> <FaLongArrowAltRight className=" text-lg mt-0.5" /></Link>
            </td>
        </tr>
    </>
}