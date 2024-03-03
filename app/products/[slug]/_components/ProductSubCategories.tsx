import { page } from "@/app/_libs/utils/routes/pages";
import { SubCategoryType } from "@/app/_libs/utils/types";
import Link from "next/link";

export default function ProductSubCategories({sub_categories}: {sub_categories: SubCategoryType[]}) {
    return sub_categories.length>0 && <p className=" my-4 flex flex-wrap"><span className=" text-lg font-semibold">Sub-Categories : &nbsp;</span> 
        <span className="flex gap-2">
            {
                sub_categories.map((item, i) => <Link href={`${page.products}?sub_category=${item.slug}&sub_category_id=${item.id}`} key={i} className=" bg-gray-100 px-2 py-1 rounded-sm">{item.name}</Link>)
            }
        </span>
    </p>
}