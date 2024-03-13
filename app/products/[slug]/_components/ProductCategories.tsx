import { page } from "@/app/_libs/utils/routes/pages";
import { CategoryType } from "@/app/_libs/utils/types";
import Link from "next/link";

export default function ProductCategories({categories}: {categories: CategoryType[]}) {
    return categories.length>0 && <p className=" my-4 flex flex-wrap items-center"><span className=" text-base md:text-lg font-semibold">Categories : &nbsp;</span> 
        <span className="flex gap-2">
            {
                categories.map((item, i) => <Link href={`${page.products}?category=${item.slug}&category_id=${item.id}`} key={i} className=" bg-gray-100 px-2 py-1 rounded-sm transition-all hover:text-white hover:bg-black">{item.name}</Link>)
            }
        </span>
    </p>
}