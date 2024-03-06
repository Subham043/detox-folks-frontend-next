import Link from "next/link";
import { MdOutlineAlternateEmail, MdOutlinePhoneIphone } from "react-icons/md";
import { page } from "../../utils/routes/pages";
import SearchDialog from "../SearchDialog";
import HeaderCartButton from "./HeaderCartButton";

export default function LinkHeader() {
    return <div className="container mx-auto">
        <div className="w-full flex-wrap justify-between items-center gap-3 py-3 hidden lg:flex">
            <div className="flex flex-wrap items-center gap-5">
                <Link className=" font-semibold" href={page.home}>Home</Link>
                <Link className=" font-semibold" href={page.about}>About Us</Link>
                <Link className=" font-semibold" href={page.products}>Products</Link>
                <Link className=" font-semibold" href={page.blogs}>Blogs</Link>
                <Link className=" font-semibold" href={page.contact}>Contact Us</Link>
            </div>
            <div className="flex flex-wrap items-center gap-7">
                <div className="flex flex-wrap items-center gap-3">
                    <MdOutlinePhoneIphone className=" text-4xl" />
                    <div className=" text-left">
                        <p className=" text-sm text-gray-700">Call Us</p>
                        <p className=" text-md font-semibold text-gray-700">9380911495</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <MdOutlineAlternateEmail className=" text-4xl" />
                    <div className=" text-left">
                        <p className=" text-sm text-gray-700">Email Us</p>
                        <p className=" text-md font-semibold text-gray-700">detoxfolks@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full flex-wrap justify-between items-center gap-3 py-3 flex lg:hidden">
            <SearchDialog />
            <HeaderCartButton />
        </div>
    </div>
}