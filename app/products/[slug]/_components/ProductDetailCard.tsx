"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCategories from "./ProductCategories";
import ProductDetailTabs from "./ProductDetailTabs";
import ProductPrice from "./ProductPrice";
import ProductSubCategories from "./ProductSubCategories";
import ShareProduct from "./ShareProduct";
import { getProductQueryOptions } from "@/app/_libs/utils/query/getProductQuery";
import { useCart } from "@/app/_libs/hooks/useCart";
import ProductCardCartBtn from "./ProductCartBtn";
import ProductSection from "../../_components/Products/ProductSection";
import ProductSlider from "./ProductSlider";

type ProductDetailCardProps = { slug: string };

export default function ProductDetailCard({slug}:ProductDetailCardProps) {
   
    const {
        data
    } = useQuery({
        queryKey: getProductQueryOptions.getProductQueryKey(slug),
        queryFn: () => getProductQueryOptions.getProductQueryFn(slug),
    })

    const {quantity, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id: data!.id, product_prices: data!.product_prices, min_cart_quantity: data!.min_cart_quantity, cart_quantity_interval: data!.cart_quantity_interval});
    
    return <>
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start mt-10">
                    <div className=" w-[48%] px-10 py-10 bg-white rounded-md box-border sticky top-10">
                        <ProductSlider images={data!.product_images.map(item => item.image)} />
                    </div>
                    <div className=" w-[48%] px-10 py-10 bg-white rounded-md box-border">
                        <h3 className=" text-2xl text-black font-semibold mb-2">{data?.name}</h3>
                        <ProductPrice product_prices={data!.product_prices} cart_product_item={cart_product_item} cart_quantity_specification={data!.cart_quantity_specification} />
                        <ProductCardCartBtn quantity={quantity} min_cart_quantity={data!.min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartItemLoading} />
                        <ProductCategories categories={data ? data.categories : []} />
                        <ProductSubCategories sub_categories={data ? data.sub_categories : []} />
                        <ShareProduct name={data!.name} slug={data!.slug} />
                        <ProductDetailTabs description={data ? data.description : ''} product_specifications={data ? data.product_specifications : []} />
                    </div>
                </div>
                <div className="w-full mt-8">
                    <h5 className="my-5 text-center text-3xl font-semibold">Related Items</h5>
                    <ProductSection searchParams={{category: undefined, category_id:data!.categories.map(item => item.id).join('_'), sub_category: undefined, sub_category_id:data!.sub_categories.map(item => item.id).join('_')}} />
                </div>
            </div>
        </div>
    </>
}