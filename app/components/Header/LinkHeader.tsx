import Link from "next/link";
import { MdOutlineAlternateEmail, MdOutlinePhoneIphone } from "react-icons/md";

export default function LinkHeader() {
    return <div className="container mx-auto">
        <div className="w-full flex flex-wrap justify-between items-center gap-3 py-3">
            <div className="flex flex-wrap items-center gap-5">
                <Link className=" font-semibold" href='/'>Home</Link>
                <Link className=" font-semibold" href='/about-us'>About Us</Link>
                <Link className=" font-semibold" href='/'>Products</Link>
                <Link className=" font-semibold" href='/'>Blogs</Link>
                <Link className=" font-semibold" href='/contact-us'>Contact Us</Link>
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
    </div>
}