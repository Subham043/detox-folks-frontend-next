import { page_routes } from "@/app/utils/page_routes";
import Image from "next/image";
import Link from "next/link";

export default function CartCard() {
    return <div className="w-full px-3 py-3 flex justify-between items-start gap-2 border-b border-solid border-gray-200 last:border-none">
        <Image src='https://server-api.parcelcounter.in/storage/products/GSQFXX0vKcFDPhafuJDAHAMRGf1RGble0RL1uWfI.png' alt="" width={100} height={100} />
        <div className=" h-100 flex-1 flex flex-col justify-between h-100">
            <div className="w-full h-auto mb-2">
                <Link href={page_routes.home} className=" w-full font-semibold">9x12 Full Size Silver Pouch</Link>
                <p className=" w-full text-sm">Unit Price - ₹73/packets</p>
            </div>
            <div className=" w-full h-auto flex justify-between items-center">
                <div className=" flex flex-wrap justify-start items-center gap-1">
                    <button className=" inline-block bg-gray-200 px-2 py-0.5 text-lg font-semibold rounded-sm">-</button>
                    <input type="text" defaultValue={1} className=" w-16 max-w-16 inline-block bg-gray-200 px-2 py-0.5 text-lg font-semibold rounded-sm flex-1 text-center" />
                    <button className=" inline-block bg-gray-200 px-2 py-0.5 text-lg font-semibold rounded-sm">+</button>
                </div>
                <p className=" w-auto font-semibold">&#8377;100.00</p>
            </div>
        </div>
    </div>
}