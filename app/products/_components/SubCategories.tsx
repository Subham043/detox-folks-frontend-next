import { SubCategoryType } from "../../_libs/utils/types";
import SubCategoryCard from "./SubCategoryCard";

export default function SubCategories({name, slug, sub_categories}:{name:string, slug:string, sub_categories: SubCategoryType[]}) {
    return <div className="w-full">
        <div className="container mx-auto">
            <h3 className=" text-2xl font-semibold text-center mb-5">{name}</h3>
            <div className="w-full flex flex-wrap justify-center items-start">
                {
                    sub_categories.map((item, i) => <div className=" w-1/4" key={i}>
                        <SubCategoryCard name={item.name} image={item.image} slug={item.slug} category_slug={slug} />
                    </div>)
                }
            </div>
        </div>
    </div>
}