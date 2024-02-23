import Image from "next/image";
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import SearchDialog from "../SearchDialog";
import { page_routes } from "@/app/utils/page_routes";

export default function LogoHeader() {
    return <div className="container mx-auto border-b border-gray-200 border-solid">
        <div className="w-full flex flex-wrap justify-between items-center gap-12 py-3">
            <div className="flex flex-1 flex-wrap items-center gap-12">
                <Link href={page_routes.home}>
                    <Image
                        src="https://server-api.parcelcounter.in/storage/general_website_settings_logo/jptM6LCFtgFNp4Z4qu7l2YIXKSJPrmg8Gwz5MbdO.png"
                        alt="Vercel Logo"
                        width={150}
                        height={150}
                        priority
                    />
                </Link>
                <SearchDialog />
            </div>
            <div className="flex flex-wrap items-center gap-5">
                <button className="flex flex-wrap items-center gap-2">
                    <Image
                        src="/user.png"
                        alt="Vercel Logo"
                        className=" rounded-full"
                        width={40}
                        height={40}
                        priority
                    />
                    <p>
                        Login
                    </p>
                </button>
                <button className="flex flex-wrap items-center gap-3">
                    <div className=" bg-gray-100 rounded-full relative flex justify-center items-center w-11 h-11">
                        <FaShoppingBasket />
                        <span className="w-5 h-5 absolute bg-black text-white rounded-full -top-1.5 -right-0.5 text-sm flex justify-center items-center">3</span>
                    </div>
                    <div className=" text-left">
                        <p className=" text-xs">TOTAL PRICE</p>
                        <p className=" text-md font-semibold">&#8377;100.00</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
}