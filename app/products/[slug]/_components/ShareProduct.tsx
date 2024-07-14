import { page } from "@/app/_libs/utils/routes/pages";
import Link from "next/link";
import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ShareProduct({name, slug}:{
    name: string;
    slug: string;
}) {
    return <p className=" my-4 flex flex-wrap"><span className=" text-lg font-semibold">Share : &nbsp;</span> 
        <span className="flex gap-2">
            <Link href={`https://www.facebook.com/share.php?u=${process.env.NEXT_PUBLIC_MAIN_URL}${page.products}/${slug}&title=${name}`} target="_blank" className=" flex text-[#8c6d52] justify-center items-center bg-neutral-200 w-[30px] h-[30px] rounded-full transition-all hover:text-white hover:bg-[#8c6d52]"><FaFacebookF /></Link>
            <Link href={`https://twitter.com/share?text=${name}&url=${process.env.NEXT_PUBLIC_MAIN_URL}${page.products}/${slug}`} target="_blank" className=" flex text-[#8c6d52] justify-center items-center bg-neutral-200 w-[30px] h-[30px] rounded-full transition-all hover:text-white hover:bg-[#8c6d52]"><FaTwitter /></Link>
            <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_MAIN_URL}${page.products}/${slug}&title=${name}&source=${name}`} target="_blank" className=" flex text-[#8c6d52] justify-center items-center bg-neutral-200 w-[30px] h-[30px] rounded-full transition-all hover:text-white hover:bg-[#8c6d52]"><FaLinkedin /></Link>
        </span>
    </p>
}