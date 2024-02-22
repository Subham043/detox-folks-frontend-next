import Breadcrumb from "../components/Breadcrumb";
import Categories from "./Categories";
import ProductSection from "./Products";

export default async function Products() {
    return <>
        <Breadcrumb name="Products" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="w-full max-w-full flex flex-wrap justify-between items-start gap-5">
                    <div className=" w-1/5 shrink-0 sticky top-8">
                        <Categories />
                    </div>
                    <div className=" flex-1 shrink-0">
                        <ProductSection />
                    </div>
                </div>
            </div>
        </div>
    </>
}