"use client";

import { getLegalsQueryOptions } from "@/app/_libs/utils/query/getLegalsQuery";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdLocationOn, MdOutlineAlternateEmail, MdOutlinePhoneIphone } from "react-icons/md";
import { page } from "../../utils/routes/pages";

export default function MainFooter() {
    const {
        data
    } = useQuery({
        queryKey: getLegalsQueryOptions.getLegalsQueryKey,
        queryFn: getLegalsQueryOptions.getLegalsQueryFn,
    })
    return <div className="container mx-auto ">
            <div className=" pt-10 pb-3 flex flex-wrap justify-center items-start gap-3">
                <div className=" w-full lg:w-1/4">
                    <Link className=" text-center" href={page.home}>
                        <Image
                            src="/logo.webp"
                            alt="Parcelcounter Footer Logo"
                            className="mx-auto"
                            width={150}
                            height={150}
                        />
                    </Link> 
                    <div className="flex flex-wrap justify-center items-center gap-3 py-6">
                        <Link className=" bg-white text-[#8c6d52] rounded-full relative flex justify-center items-center w-9 h-9 transition-all hover:text-white hover:bg-[#8c6d52]" href={page.home}>
                            <FaFacebookF className=" text-md" />
                        </Link>
                        <Link className=" bg-white text-[#8c6d52] rounded-full relative flex justify-center items-center w-9 h-9 transition-all hover:text-white hover:bg-[#8c6d52]" href={page.home}>
                            <FaInstagram className=" text-md" />
                        </Link>
                        <Link className=" bg-white text-[#8c6d52] rounded-full relative flex justify-center items-center w-9 h-9 transition-all hover:text-white hover:bg-[#8c6d52]" href={page.home}>
                            <FaLinkedin className=" text-md" />
                        </Link>
                        <Link className=" bg-white text-[#8c6d52] rounded-full relative flex justify-center items-center w-9 h-9 transition-all hover:text-white hover:bg-[#8c6d52]" href={page.home}>
                            <FaYoutube className=" text-md" />
                        </Link>
                    </div>
                    <Image
                        src="/payments.webp"
                        alt="Parcelcounter Payment Options"
                        className="mx-auto"
                        width={190}
                        height={190}
                    />
                </div>
                <div className=" w-full lg:w-1/5">
                    <h4 className=" text-2xl font-bold mb-5 text-[#8c6d52]">Quick Links</h4>
                    <Link className=" text-md text-[#8c6d52] mb-5 block" href={page.home}>Home</Link>
                    <Link className=" text-md text-[#8c6d52] mb-5 block" href={page.about}>About Us</Link>
                    <Link className=" text-md text-[#8c6d52] mb-5 block" href={page.products}>Products</Link>
                    <Link className=" text-md text-[#8c6d52] mb-5 block" href={page.blogs}>Blogs</Link>
                    <Link className=" text-md text-[#8c6d52] mb-5 block" href={page.contact}>Contact Us</Link>
                </div>
                <div className=" w-full lg:w-1/5">
                    <h4 className=" text-2xl font-bold mb-5 text-[#8c6d52]">Legal Links</h4>
                    {
                        (data ? data.legal : []).map((item, i) => <Link className=" text-md text-[#8c6d52] mb-5 block" href={`${page.legal}/${item.slug}`} key={i}>{item.page_name}</Link>)
                    }
                </div>
                <div className=" w-full lg:w-1/4">
                    <h4 className=" text-2xl font-bold mb-5 text-[#8c6d52]">Contact Us</h4> 
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <MdOutlineAlternateEmail className=" text-4xl text-[#8c6d52]" />
                        <div className=" text-left">
                            <p className=" text-md text-[#8c6d52]">detoxfolks@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <MdOutlinePhoneIphone className=" text-4xl text-[#8c6d52]" />
                        <div className=" text-left">
                            <p className=" text-md text-[#8c6d52]">9380911495</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <MdLocationOn className=" text-4xl text-[#8c6d52]" />
                        <div className=" text-left">
                            <p className=" text-md text-[#8c6d52]">2, OVH ROAD,<br/> BASAVANAGUDI,<br/> BENGALURU, Pin - 560004</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-start lg:justify-between items-center gap-1 lg:gap-3 mb-5">
                        <Image
                            src="/google-store.png"
                            alt="Playstore Logo"
                            className="lg:mx-auto"
                            width={145}
                            height={145}
                        />
                        <Image
                            src="/app-store.png"
                            alt="Appstore Logo"
                            className="lg:mx-auto"
                            width={145}
                            height={145}
                        />
                    </div>
                </div>
            </div>
        </div>
}