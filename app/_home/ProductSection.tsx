import { notFound } from "next/navigation";
import Products from "./Products";
import Link from "next/link";
import { page } from "../_libs/utils/routes/pages";
import { FaArrowRightLong } from "react-icons/fa6";


async function getData({slug}:{ slug: string }) {

    switch (slug) {
        case 'is_featured':
            return {
                title: "Exclusive Products",
                slug: "is_featured",
            }
        case 'is_new':
            return {
                title: "Eco-Friendly Products",
                slug: "is_new",
            }
        case 'is_on_sale':
            return {
                title: "On Demand Products",
                slug: "is_on_sale",
            }
    
        default:
            notFound()
    }
}
export default async function ProductSection({slug}:{slug:string}){

    const data = await getData({slug: slug})

    return <div className="w-full pb-10">
        <div className="container mx-auto">
            <div className="w-full max-w-full flex flex-wrap justify-between items-start gap-3 mb-5">
                <h3 className="w-auto text-2xl font-semibold">
                    {data.title}
                </h3>
                <Link href={`${page.special_products}/${data.slug}`} className="w-auto text-sm bg-black text-white text-center px-3 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><span>Show More</span> <FaArrowRightLong /></Link>
            </div>
            <div className="w-full max-w-full flex flex-wrap justify-between items-start">
                <div className="w-full">
                    <Products slug={data.slug} />
                </div>
            </div>
        </div>
    </div>
}