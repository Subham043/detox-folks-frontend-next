import { page } from "@/app/_libs/utils/routes/pages";
import { BlogType } from "@/app/_libs/utils/types"
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";


type BlogCardProps = BlogType

export default function BlogCard({slug, image, name, description_unfiltered, created_at}:BlogCardProps) {
    return <div className="w-full px-2 py-2">
        <div className="w-full overflow-hidden bg-white rounded-md">
            <Link href={`${page.blogs}/${slug}`} className="w-full">
                <Image src={image} alt={name} title={name} width={400} height={100} className="w-full rounded-md" />
                <div className="w-full px-3 py-3">
                    <div className=" flex justify-start items-center gap-2 mb-3">
                        <IoCalendar className=" text-lg" />
                        <p className=" text-base text-neutral-500 w-auto">{created_at}</p>
                    </div>
                    <h3 className=" text-2xl font-semibold capitalize mb-2">{name}</h3>
                    <p className=" text-sm text-neutral-500 mb-2 line-clamp-2">{description_unfiltered}</p>
                    <div className=" flex justify-start items-center gap-2">
                        <p className=" text-base font-semibold w-auto">Read More</p>
                        <FaLongArrowAltRight className=" text-lg mt-0.5" />
                    </div>
                </div>
            </Link>
        </div>
    </div>
}